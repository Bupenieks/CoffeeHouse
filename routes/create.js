var express = require('express');
var router = express.Router();
var vcs = require('../lib/version_control.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('create', { title: 'Express' });
});

router.get('/newrepo', (req, res, next) => {
  if(!req.query.repoId || !req.query.userId) {
    console.error("Failed to create repository. Insufficient id's given.")
  } else {
    vcs.createNewRepo(req.query.userId, req.query.repoId)
  }
})

module.exports = router;
