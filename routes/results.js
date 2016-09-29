var express = require('express');
var router = express.Router();
var axios = require('axios');
var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GOOGLE_API_KEY,
  formatter: null
};

var geocoder = NodeGeocoder(options);


/* GET home page. */
router.get('/', function(req, res, next) {

  axios.get(`http://api.workfrom.co/places/postal/${req.query.location}?appid=${process.env.WORKFROM_API_KEY}`)
  .then((results) => {
    var error;
    var data;
    var locations = results.data.response;
    if (results.data.meta.code === 404) {
      res.render('error', {
        message: 'No results found, please try again.',
        error: {},
        title: 'Office Anywhere',
        brand: 'Office Anywhere'
      });
    } else if (results.data.meta.code === 500) {
      res.render('error', {
        message: 'Something went wrong.  Please wait a moment and try again.',
        error: {},
        title: 'Office Anywhere',
        brand: 'Office Anywhere'
      });
    } else {
      data = locations;
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

   })
   .catch(function(err) {
     console.log(err);
   });

});

module.exports = router;
