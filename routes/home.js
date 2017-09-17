var express = require('express');
var router = express.Router();
var vcs = require('../lib/version_control')

/* GET home page. */
router.get('/', function(req, res, next) {
   if (res.locals.user) {
  var theUser = vcs.getJSON(res.locals.user.username);
  theUser.repositories = [{"title":"TheTitle","path":"/uploads/bryson1.mp3"}]
} else {
  theUser = {}
}
  res.render('index', {
    title: 'Express',
    user: res.locals.user || "",
    profile: theUser,
   });

});

module.exports = router;
