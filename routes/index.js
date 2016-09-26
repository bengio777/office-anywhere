var express = require('express');
var router = express.Router();


router.get('/', getHomePage); //Retrieves '/'
router.get('/locations', getLocationPage); // Retrieves selected location

function getHomePage(req, res, next) {
    res.render('index', {
        title: 'Office Anywhere'
    })
}

function getLocationPage(req, res, next) {
    res.render('locations')
}

module.exports = router;
