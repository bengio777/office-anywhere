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
                comments: data
            })
        })
}


router.post('/locations', function(req, res, next) {
  console.log(req.body.title);
            queries.addComments(req.body.title,req.body.body)
                .then(function() {
                    queries.Comments()
                    .then(function(comments){
                      response.redirect('/locations',{comments:comments})

                    })
                })

            })


        module.exports = router;
