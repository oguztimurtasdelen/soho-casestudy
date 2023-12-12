var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config');

// ROUTERS
// Application Routes
var productsApplicationRouter = require('./routes/application/products');

// Admin Routes
var authenticationAdminRouter = require('./routes/admin/authentication');
var usersAdminRouter = require('./routes/admin/users');
var productsAdminRouter = require('./routes/admin/products');
var transactionsAdminRouter = require('./routes/admin/transaction');


var app = express();

app.use(cors());

mongoose
  .connect(`mongodb+srv://${config.mongoUsername}:${config.mongoPassword}@sohodev.ftxmwqk.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    console.log('Mongo Atlas connected successfully!');
  })
  .catch((err) => {
    console.log('Mongo Atlas connection failed!');
  });



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());



// CORS - Cross-Origin Resource Sharing
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');

  next();
});


// Application
app.use('/products', productsApplicationRouter);

// Admin
app.use('/admin/authentication', authenticationAdminRouter);
app.use('/admin/users', usersAdminRouter);
app.use('/admin/products', productsAdminRouter);
app.use('/admin/transaction', transactionsAdminRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
