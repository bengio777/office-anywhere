var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {

  axios.get(`http://api.workfrom.co/places/postal/${req.query.location}?appid=${process.env.WORKFROM_API_KEY}`)
  .then((results) => {
    var error;
    var data;

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
      data = results.data.response;
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
