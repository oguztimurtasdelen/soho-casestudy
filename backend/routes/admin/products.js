var express = require('express');
var router = express.Router();
const productController = require('../../controllers/admin/products'); 
const checkAuth  = require('../../middlewares/auth-guard');

router.get('/', checkAuth, productController.getProducts);

router.get('/:productcode', checkAuth, productController.getProductById);

router.post('', checkAuth, productController.createProduct);

router.put('/:productcode', checkAuth, productController.updateProduct);

router.delete('/:productcode', checkAuth, productController.deleteProduct);

module.exports = router;
