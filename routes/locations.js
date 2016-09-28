var express = require('express');
var router = express.Router();
var queries = require('../db/queries')
    // var db = require('/db')


router.get('/', getLocationsPage); // Retrieves selected location

function getLocationsPage(req, res, next) {
    queries.Comments().orderBy('id', 'asc')

        .then(function(data) {
            res.render('locations', {
                title: 'Office Anywhere',
                brand: 'Office Anywhere',
                verify:req.isAuthenticated(),
                comments: data
            })
        })
}


router.post('/locations', function(req, res, next) {
  console.log('this is the TITLE: ' + req.body.title);
            queries.addComments(req.body.title,req.body.body)
                .then(function() {
                    queries.Comments()
                    .then(function(comments){
                      console.log(comments);
                      res.render('locations',{comments:comments, verify:req.isAuthenticated()})

                    })
                })
            })


        module.exports = router;
