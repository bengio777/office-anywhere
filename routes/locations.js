var express = require('express');
var router = express.Router();
var queries = require('../db/queries')

router.get('/', getLocationPage); // Retrieves selected location



function getLocationPage(req, res, next) {
    queries.Comments().orderBy('id', 'asc')
        .then(function(data) {
            res.render('locations', {
                brand: 'Office Anywhere',
                comments: data
            })
        })
}

module.exports = router;
rts = router;
