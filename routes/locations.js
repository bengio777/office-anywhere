var admin;
var venue;
var express = require('express');
var router = express.Router();
var queries = require('../db/queries');
var axios = require('axios');
var workfrom= require('workfrom')

router.get('/:id', getLocationsPage); // Retrieves selected location
router.post('/', postComment); // Posts a comment

function getLocationsPage(req, res, next) {
  axios.get(`http://api.workfrom.co/places/${req.params.id}?appid=${process.env.WORKFROM_API_KEY}`)
  .then(function(result){
  console.log(result.data.response);
  venue = result.data.response;
})
  queries.Comments().orderBy('id', 'asc')
    .then(function(data) {
      for(var i in data){
        if(req.isAuthenticated()){
          var userRole = req.user.role
        if (
          userRole != 'admin'|| userRole==undefined){
          data[i].admin = false;
        }else{
          data[i].admin = true;
          }
        }else{
          data[i].admin = false;
          }
      }
          res.render('locations', {
            title: 'Office Anywhere',
            brand: 'Office Anywhere',
            verify: req.isAuthenticated(),
            comments: data,
            venue: venue,
            admin : data.admin
    })
  })
}

function postComment(req, res, next) {
  queries.addComments(req.body.title,req.body.body)
    .then(function() {
      queries.Comments()
        .then(function(comments){
          res.render('locations',{comments:comments, verify:req.isAuthenticated()})
    })
  })
}

module.exports = router;
