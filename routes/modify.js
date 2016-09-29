var express = require('express');
var router = express.Router();
var axios = require('axios');
var workfrom = require('workfrom');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('modify', {
    title: 'Office Anywhere - Results',
    brand: 'Office Anywhere'
  });
});

module.exports = router;
