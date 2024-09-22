var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET/POST/PUT/DELETE/PATCH/...
router.get('/xinchao',function(req, res, next){
  res.render('hello');
});
module.exports = router;
