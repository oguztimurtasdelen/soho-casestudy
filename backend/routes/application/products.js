var express = require('express');
var router = express.Router();
const productController = require('../../controllers/application/products'); 


router.get('/', productController.getProducts);

router.get('/:id', productController.getProductById);


module.exports = router;
