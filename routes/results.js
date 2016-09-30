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

/* GET search results. */
router.get('/', function(req, res, next) {
    axios.get(`http://api.workfrom.co/places/postal/${req.query.location}?appid=${process.env.WORKFROM_API_KEY}`)
        .then((results) => {

            var locations = results.data.response;
            var status = results.data.meta.code;
            var addresses = [];

            for (var location of locations) {
                addresses.push(`${location.street} ${location.city}`);
            }

            return {
                locations,
                status,
                addresses
            };

        })
        .then((q) => {

            return new Promise((resolve, reject) => {

                geocoder.batchGeocode(q.addresses, function(err, results) {

                    if (err) {
                        reject("Something went wrong, couldn't geocode addresses.");
                    }

                    var pins = []
                    for (var result of results) {
                        var pin = {
                            lat: result.value[0].latitude,
                            lng: result.value[0].longitude
                        }
                        pins.push(pin);
                    }
                    resolve({
                        locations: q.locations,
                        status: q.status,
                        pins
                    });
                });

            });

        })
        .then((r) => {

            function buildMapScript() {
                var scriptBody = "<script>function initMap() {\
                      var center = {lat:" + r.pins[0].lat + ", lng:" + r.pins[0].lng + " };\
                      \
                      var map = new google.maps.Map(document.getElementById('map'), {\
                        zoom: 12,\
                        center\
                      }); "

                for (var pin of r.pins) {
                    scriptBody += "var marker = new google.maps.Marker({\
                      position: {lat:" + pin.lat + ", lng:" + pin.lng + "},\
                      map: map,\
                      title: 'Hello World!'\
                    });"
                }
                scriptBody += "}</script>"

                return scriptBody;
            }

            if (r.status === 404) {
                res.render('error', {
                    message: 'No results found, please try again.',
                    error: {},
                    title: 'Office Anywhere',
                    brand: 'Office Anywhere',
                    verified: req.isAuthenticated(),
                    user: req.user
                });
            } else if (r.status === 500) {
                res.render('error', {
                    message: 'Something went wrong.  Please wait a moment and try again.',
                    error: {},
                    title: 'Office Anywhere',
                    brand: 'Office Anywhere',
                    verified: req.isAuthenticated(),
                    user: req.user
                });
            } else {
                data = r.locations;
            }

            res.render('results', {
                title: 'Office Anywhere - Results',
                brand: 'Office Anywhere',
                error: r.error,
                data,
                count: data.length,
                map: buildMapScript,
                loadMap: true,
                verified: req.isAuthenticated(),
                user: req.user
            });
        })
        .catch(function(err) {
            console.log(err);
        });

});

module.exports = router;
