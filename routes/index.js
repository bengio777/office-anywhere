var express = require('express');
var router = express.Router();
var queries = require('../db/queries')

router.get('/', getHomePage); //Retrieves '/'
router.get('/locations', getLocationPage); // Retrieves selected location

function getHomePage(req, res, next) {
    res.render('index', {
        title: 'Office Anywhere'
    })
}

function getLocationPage(req, res, next) {
    queries.Comments().orderBy('id', 'asc')
        .then(function(data) {
            res.render('locations', {
                title: 'Office Anywhere',
                comments: data
            })
        })
}

module.exports = router;
rts = router;
