var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const mongoose = require('mongoose');
require('./models/orderModel');
require('./models/userModel');
require('./models/productModel');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productrouter = require('./routes/product');
var productAPIRouter = require('./routes/productAPI');
var userAPIRouter = require('./routes/userAPI');
var orderAPIRouter = require('./routes/orderAPI');

var corsOptionsDelegate = function (req, callback) {
  var corsOptions = { origin: true };
  callback(null, corsOptions);
}

var app = express();
app.use(cors(corsOptionsDelegate));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// connect database
mongoose.connect('mongodb://127.0.0.1:27017/hurst_store', {})
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));

// localhost:3000
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sanpham', productrouter);
app.use('/product-api', productAPIRouter);
app.use('/user-api', userAPIRouter);
app.use('/order-api', orderAPIRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
