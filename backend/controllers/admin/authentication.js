const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const config = require('../../config');

async function register(req, res, next) {
    const registerForm = req.body;
    let _resStatus = 201;
    let _error = false;
    let _message;

    try {
        // Check if username already exist?
        const isUserExist = await User.findOne({ username: registerForm.username });
        if (isUserExist) {
            throw('Username already exist');
        }

        // Check password requirements
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{4,12}$/;
        if (!passwordRegex.test(registerForm.password) && (registerForm.password !== registerForm.confirmPassword)) {
            throw('Password requirements are not satisfied!');
        }

        // Hash password w/ salt
        const hashedPassword = await bcrypt.hash(registerForm.password, await bcrypt.genSalt(10));

        // Create a new User
        const _User = new User({
            fullname: registerForm.fullname,
            username: registerForm.username,
            password: hashedPassword
        });

        await new User({
            fullname: registerForm.fullName,
            username: registerForm.username,
            password: hashedPassword
        }).save();

    } catch (err) {
        _resStatus = 500;
        _error = true;
        _message = err;
        
    } finally {
        res.status(_resStatus).json({
            error: _error,
            message: _message
        });
    }
}

async function login(req, res, next) {
    const loginForm = req.body;
    let _resStatus = 200;
    let _error = false;
    let _message;
    const token_expiresIn = '1h';

    try {
        const _User = await User.findOne({ username: loginForm.username });
        if (!_User) {
            _resStatus = 401;
            throw('Username already exist');
        }

        const passwordMatch = await bcrypt.compare(loginForm.password, _User.password);
        if (!passwordMatch) {
            _resStatus = 401;
            throw('Password incorrect');
        }

        var token = jwt.sign({ userId: _User._id, userName: _User.username}, config.jwt_secret_key, {expiresIn: token_expiresIn});
    } catch (err) {
        _error = true;
        _message = err;
    } finally {
        res.status(_resStatus).json({
            error: _error,
            message: _message,
            token: token,
            expiresIn: 3600
        });
    }
}

exports.register = register;
exports.login = login;