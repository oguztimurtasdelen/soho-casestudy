const jwt = require('jsonwebtoken');
const config = require('../config')


module.exports = (req, res, next) => {
    const token = req.header('Authorization').split(" ")[1];

    if (!token) {
        throw("Unauthorized - Token not provided")
    }

    try {
        const decodedToken = jwt.verify(token, config.jwt_secret_key);
        req.userData = { email: decodedToken.userName, userId: decodedToken.userId };

        next();
    } catch (err) {
        console.log(err)
        return res.status(401).json({
            error: true,
            message: err
        });
    }
    
};