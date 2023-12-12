var express = require('express');
var router = express.Router();
const transactionsController = require('../../controllers/admin/transactions'); 
const checkAuth  = require('../../middlewares/auth-guard');

router.get('/:productcode', checkAuth, transactionsController.getTransaction);

router.post('', checkAuth, transactionsController.createTransaction);


module.exports = router;
