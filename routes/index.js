var express = require('express');
var router = express.Router();
var knex = require('../db_connection');

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
        user: req.user
    })
};
router.get('/login', function(req, res, next) {
    res.render('login', {
        flash: req.flash(),
    })
});
router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect(req.get('referer'));
});


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
});
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password.',
    successFlash: 'Welcome!',
}));
router.get('/modify/:id', function(req, res, next) {
    queries.comment(req.params.id)
        .then(function(comment) {
            console.log(comment);
            res.render('modify', {
                comment: comment[0]
            })
        })
})


router.post('/isUpdated/:id', function(req, res, next){
  queries.updateComments(req.params.id, req.body.title, req.body.body)
  .then(function(){
    res.redirect('/')
  })
})

router.post('/isDeleted/:id', function(req, res, next){
    console.log("deleting comment "+req.params.id);
  queries.deleteComments(req.params.id)
  .then(function(){
    res.redirect('/locations')
  })
})


module.exports = router;
