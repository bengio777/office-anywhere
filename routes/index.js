var express = require('express');
var router = express.Router();
var knex = require('../db_connection');
var query = require("../queries");
var passport = require('../passport');
var flash = require('connect-flash');
var users = require("../users")


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Office Anywhere' , verified: req.isAuthenticated(),
});
});
router.get('/login', function(req,res,next){
  res.render('login', { flash: req.flash()}
)
});
router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect(req.get('referer'));
});

router.get('/signup', function(req,res,next){
  res.render('register')
});
router.post('/register', function(req,res,next){
    users.Register(req.body.username, req.body.password, req.body.password1)
        .then(function(error) {
            res.render('login')
        })
})
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password.',
    successFlash: 'Welcome!',
}))
module.exports = router;
