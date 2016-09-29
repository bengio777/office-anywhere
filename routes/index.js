var express = require('express');
var router = express.Router();
// var knex = require('../db_connection');
// var query = require("../queries");
var passport = require('../passport');
var flash = require('connect-flash');
var users = require("../users")
var queries = require("../db/queries")

/* GET home page. */
router.get('/', getHomePage); //Retrieves '/'

function getHomePage(req, res, next) {
    res.render('index', {
        title: 'Office Anywhere',
        brand: 'Office Anywhere',
        verified: req.isAuthenticated(),
    })
}
router.get('/login', function(req, res, next) {
    res.render('login', {
        flash: req.flash(),
    })
});
router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect(req.get('referer'));
})


router.get('/signup', function(req, res, next) {
    res.render('register')
});
router.post('/register', function(req, res, next) {
    users.Register(req.body.username, req.body.password, req.body.password1)
        .then(function(message) {
            if (message.rowCount == 1) {
                res.render('login')
            } else {
                res.render('register', {
                    message: message
                })
            }
        })
})
router.post('/login',passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password.',
    successFlash: 'Welcome!',
}))


// router.post('/locations', function(req, res, next) {
//   console.log('this is the TITLE: ' + req.body.title);
//             queries.addComments(req.body.title,req.body.body)
//                 .then(function() {
//                     queries.Comments()
//                     .then(function(comments){
//                       console.log(comments);
//                       res.render('locations',{comments:comments, verify:req.isAuthenticated()})
//
//                     })
//                 })
//
//             })
module.exports = router;
