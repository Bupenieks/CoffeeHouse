var express = require('express');
var router = express.Router();
var vcs = require('../lib/version_control')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('profile', { title: 'xd' });
});

router.get("/:username", function(req, res, next) {
  if (res.locals.user) {
  var theUser = vcs.getJSON(req.params.username);
  res.render('profile', { profile: theUser });
  }
});





module.exports = router;
