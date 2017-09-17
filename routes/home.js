var express = require('express');
var router = express.Router();
var vcs = require('../lib/version_control')

/* GET home page. */
router.get('/', function(req, res, next) {
   if (res.locals.user) {
  var theUser = vcs.getJSON(res.locals.user.username);

} else {
  theUser = {}
}
  console.log("THE JSON: "+theUser);
  res.render('index', {
    title: 'Express',
    user: res.locals.user || "",
    profile: theUser,
   });

});

module.exports = router;
