var express = require('express');
var router = express.Router();
const passport = require("passport")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

// Login form
router.get('/', (req, res) => {
    res.render('login');
})

// Login Process
router.post('/', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect:'/home',
        failureRedirect:'/login',
        failureFlash: true
    })(req, res, next);
    console.log("HERERERE")
    console.log(req.user)
})

// Logout
router.get('/', (req, res) => {
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/users/login');
})

module.exports = router;
