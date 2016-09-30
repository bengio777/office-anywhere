var express = require('express');
var router = express.Router();
var queries = require('../db/queries');
var passport = require('../passport');
var flash = require('connect-flash');
var users = require("../users")

// router.get('/modify/:id', updateComments) // Updates a comment
var axios = require('axios');
var workfrom = require('workfrom');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('modify', {
        title: 'Office Anywhere - Results',
        brand: 'Office Anywhere',
        verified: req.isAuthenticated(),
        user: req.user
    });
});


module.exports = router;
