var express = require('express');
var router = express.Router();
var vcs = require('../lib/version_control')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('profile', { title: 'xd' });
});

router.get("/:id", function(req, res, next) {
  console.log(vcs.getJSON(req.params.id))
  res.render('profile', { title: 'xd' });
});


module.exports = router;
