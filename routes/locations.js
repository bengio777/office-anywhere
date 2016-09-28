var express = require('express');
var router = express.Router();
var queries = require('../db/queries')



router.get('/', getLocationsPage); // Retrieves selected location

function getLocationsPage(req, res, next) {
    queries.Comments().orderBy('id', 'asc')

    .then(function(data) {
        res.render('locations', {
            title: 'Office Anywhere',
            brand: 'Office Anywhere',
            verify: req.isAuthenticated(),
            comments: data
        })
    })
}
module.exports = router;
