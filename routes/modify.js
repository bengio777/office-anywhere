var express = require('express');
var router = express.Router();
var queries = require('../db/queries');
var passport = require('../passport');
var flash = require('connect-flash');
var users = require("../users")



// router.get('/modify/:id', updateComments) // Updates a comment

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('modify', {
    title: 'Office Anywhere - Results',
    brand: 'Office Anywhere'
  });
});


// function updateComments(req, res, next) {
// router.get('/modify/:id',function(req,res,next){
//     queries.comment(req.params.id)
//     .then(function(comment){
//       console.log(comment);
//       res.render('modify', {comment: comment})
//     })
//
// })
module.exports = router;
