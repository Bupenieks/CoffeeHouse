var express = require('express');
var router = express.Router();
var vcs = require("../lib/version_control")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/:username/:repo", function(req, res, next) {
    if (res.locals.user)
        var theRepo = vcs.getUserRepo(vcs.getUserId[req.params.username], req.params.repo).toJSON()
    theUser.repositories = [{"title":"TheTitle","path":"/uploads/bryson1.mp3"}]
    res.render('project', { profile: theUser });
});

module.exports = router;
