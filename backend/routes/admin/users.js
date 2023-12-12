var express = require('express');
var router = express.Router();
const usersController = require('../../controllers/admin/users'); 

/* GET users listing. */
router.get('/', usersController.getUsers);

module.exports = router;
