var express = require('express');
var router = express.Router();

router.get('/', getHomePage); //Retrieves '/'

function getHomePage(req, res, next) {
    res.render('index', {
        title: 'Office Anywhere',
        brand: 'Office Anywhere'
    })
}

module.exports = router;
rts = router;
