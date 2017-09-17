var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('profile', { title: 'Express' });
});

router.get("/:id", function(req, res, next) {
  res.render('profile', { title: req.params.id });
});


module.exports = router;
