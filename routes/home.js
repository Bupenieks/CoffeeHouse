var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: res.locals.user });
  console.log("USER+ "+res.locals.user);
});

module.exports = router;
