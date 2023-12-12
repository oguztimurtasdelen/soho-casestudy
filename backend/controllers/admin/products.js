const Product = require('../../models/Product');

async function getProducts(req, res, next) {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const skipPage = (page - 1) * pageSize;

    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / pageSize);

    const productList = await Product.find().skip(skipPage).limit(pageSize);

    res.status(200).json({
        error: false,
        productList: productList,
        totalPages: totalPages
    });
}

async function getProductById(req, res, next) {
    const productCode = req.params.productcode;

    const product = await Product.findOne({ code: productCode });

    res.status(200).json({
        error: false,
        product: product

    });
}

async function createProduct(req, res, next) {

    const productInfo = req.body;
    
    const _Product = new Product({
        createdat: Date.now(),
        code: productInfo.code,
        name: productInfo.name,
        description: productInfo.description,
        stock: productInfo.stock,
        price: productInfo.price
    });

    const newProduct = await _Product.save();

    res.status(201).json({
        error: false,
        productInfo: newProduct
    });

}

async function updateProduct(req ,res, next) {
    const productInfo = req.body;
    let _resStatus = 201;
    let _error = false;
    let _message;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(productInfo._id, productInfo, {
            new: true,
            runValidators: true
        });

        if (!updatedProduct) {
            _resStatus = 404;
            throw('Product not found!');
        }

    } catch (err) {
        _error = true;
        _message = err;
    } finally {
        res.status(_resStatus).json({
            error: _error,
            message: _message,
            productInfo: productInfo
        });
    }
    
}

async function deleteProduct(req, res, next) {
    const productCode = req.params.productcode;

    const _Product = await Product.findOne({ code: productCode });
    const deletedProduct = await Product.findByIdAndDelete(_Product._id);


    res.status(200).json({
        error: false,
        product: deletedProduct

    });
    
}

exports.getProducts = getProducts;
exports.getProductById = getProductById;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;