const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const vcs = require('../lib/version_control')
const uuid = require('uuid/v4')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});

// Bring in Models
let User = require('../models/users.js')

// Register Process
router.post('/', (req, res) => {
    const name = req.body.fullname;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;
    let repositories = {contents: []}
    const uniqId = uuid();

    let errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        });
    } else {
        let newUser = new User({
                uniqId,
                name,
                email,
                username,
                password,
                repositories
        });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save((err) => {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        console.log("registered!")
                        console.log(newUser)
                        vcs.createNewProfile(newUser.uniqId, newUser.username, newUser.name, newUser.email)
                        req.flash('success', 'You are now registered!');
                        res.redirect('/login');
                    }
                });
            });
        });
    }

})



module.exports = router;
