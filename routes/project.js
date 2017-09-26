var express = require('express');
var router = express.Router();
var vcs = require("../lib/version_control")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/:repo", function(req, res, next) {
    var theRepo = vcs.getUserRepo(req.user.uniqId, req.params.repo).toJSON()
    console.log(theRepo.mainFileLoc.loc)
    res.render('project', {
      profile: theRepo,
      title: req.params.repo,
      owner: vcs.ownerToUser(theRepo.owner),
      contributors: theRepo.tracks,
      src: theRepo.mainFileLoc.loc,
    });

});

module.exports = router;
