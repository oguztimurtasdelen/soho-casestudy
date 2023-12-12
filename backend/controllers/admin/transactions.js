const Transaction = require('../../models/Transaction');
const Product = require('../../models/Product');

async function getTransaction(req, res, next) {
    const productCode = req.params.productcode;

    const _Product = await Product.findOne({ code: productCode });
    const _Transaction = await Transaction.find({ productId: _Product._id});

    res.status(200).json({
        error: false,
        transactionList: _Transaction,
        productInfo: _Product

    });
}

async function createTransaction(req, res, next) {
    const transactionInfo = req.body;
    var _resStatus = 200;
    var _error = false;
    var _message;

    var _Transaction = null;

    try {
        const _Product = await Product.findOne({ code: transactionInfo.productCode });
        const newTransaction = new Transaction({
            productId: _Product._id,
            type: ["IN", "OUT"].indexOf(transactionInfo.type) >= 0 ? transactionInfo.type : null,
            quantity: parseInt(transactionInfo.quantity),
            description: transactionInfo.description
        });

        _Transaction = await newTransaction.save();

        if (transactionInfo.type === "IN") {
            _Product.stock += parseInt(transactionInfo.quantity);
        } else if (transactionInfo.type === "OUT") {
            // Check if stock is going under 0
            if (_Product.stock < transactionInfo.quantity) {
                throw('Not enough stock');
            }
            _Product.stock -= parseInt(transactionInfo.quantity);
        }

        await _Product.save();
    } catch (error) {
        _error = true;
        _message = error;
    } finally {
        res.status(_resStatus).json({
            error: _error,
            message: _message,
            transactionInfo: _Transaction,
        });
    }
}

exports.getTransaction = getTransaction;
exports.createTransaction = createTransaction;