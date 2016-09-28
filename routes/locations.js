var admin;
var express = require('express');
var router = express.Router();
var queries = require('../db/queries')



router.get('/', getLocationsPage); // Retrieves selected location

function getLocationsPage(req, res, next) {
  if(req.isAuthenticated()){
    var tt = req.user.role
    if (
     tt != 'admin'|| tt==undefined){
      admin = false;
    }else{
      admin = true;
    }
  }

    queries.Comments().orderBy('id', 'asc')
        .then(function(data) {
            res.render('locations', {
                title: 'Office Anywhere',
                brand: 'Office Anywhere',
                verify: req.isAuthenticated(),
                comments: data,
                admin : admin
            })
        })
    }


router.post('/locations', function(req, res, next) {
            queries.addComments(req.body.title,req.body.body)
                .then(function() {
                    queries.Comments()
                    .then(function(comments){
                      res.render('locations',{comments:comments, verify:req.isAuthenticated()})
                    })
                })
            })

module.exports = router;
