var express = require('express');
var router = express.Router();
var vcs = require("../lib/version_control")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/:repo", function(req, res, next) {
    var theRepo = vcs.getUserRepo(req.user.uniqId, req.params.repo).toJSON()
    res.render('project', { profile: theRepo });
});

module.exports = router;
