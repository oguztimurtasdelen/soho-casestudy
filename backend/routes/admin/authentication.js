var express = require('express');
var router = express.Router();
const authenticationController = require('../../controllers/admin/authentication'); 


router.post('/register', authenticationController.register);

router.post('/login', authenticationController.login);

module.exports = router;
