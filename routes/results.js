var express = require('express');
var router = express.Router();
var Workfrom = require('workfrom');
var axios = require('axios');

var wf = Workfrom({
  appid: process.env.WORKFROM_API_KEY
});

/* GET home page. */
router.post('/', function(req, res, next) {

  wf.places.near({ postalCode: req.body.location })
  .then((results) => {
    var error;
    var data;

    if (results.meta.code === 404) {
      res.render('error', {
        message: 'No results found, please try again.',
        error: {},
        title: 'Office Anywhere',
        brand: 'Office Anywhere'
      });
    } else if (results.meta.code === 500) {
      res.render('error', {
        message: 'Something went wrong.  Please wait a moment and try again.',
        error: {},
        title: 'Office Anywhere',
        brand: 'Office Anywhere'
      });
    } else {
      data = results.response;
    }

    // console.log(results);
    // res.send(results);

     res.render('results', {
       title: 'Office Anywhere - Results',
       brand: 'Office Anywhere',
       error,
       data,
       count: data.length
     });

   });

});

module.exports = router;
