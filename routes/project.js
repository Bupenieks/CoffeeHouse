var express = require('express');
var router = express.Router();
var vcs = require("../lib/version_control")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/:username", function(req, res, next) {
  var theUser = vcs.getJSON(req.params.username);
  res.render('project', { profile: theUser });
});

module.exports = router;
