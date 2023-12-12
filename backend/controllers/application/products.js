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
    const productId = req.params.id;

    const product = await Product.findOne({ code: productId });

    res.status(200).json({
        error: false,
        product: product

    });
}

exports.getProducts = getProducts;
exports.getProductById = getProductById;
