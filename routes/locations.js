var admin;
var venue;
var express = require('express');
var router = express.Router();
var queries = require('../db/queries');
var axios = require('axios');
var workfrom = require('workfrom');

router.get('/:id', getLocationsPage); // Retrieves selected location
router.post('/resultID/:id', postComment); // Posts a comment

function getLocationsPage(req, res, next) {
  axios.get(`http://api.workfrom.co/places/${req.params.id}?appid=${process.env.WORKFROM_API_KEY}`)
    .then(function(result){
    venue = result.data.response;
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
              } //DO NOT DELETE THIS CURLY. THE CURLIES LOOK WEIRD HERE, BUT THEY ARE CORRECT
            }else{
                data[i].admin = false;
          }
      }
          console.log(venue);
            res.render('locations', {
              venue: venue,
              title: 'Office Anywhere',
              brand: 'Office Anywhere',
              verify: req.isAuthenticated(),
              comments: data,
              admin : data.admin,
              resultID: venue[0].ID
      })
    })
  })
}

function postComment(req, res, next) {

  var ID= req.params.id;
  queries.addComments(req.body.title,req.body.body)
    .then(function() {
      queries.Comments()
        .then(function(comments){
          res.redirect('/locations/'+ID)
    })
  })
}

module.exports = router;
