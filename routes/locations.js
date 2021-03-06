var admin;
var venue;
var express = require('express');
var router = express.Router();

var queries = require('../db/queries')
var axios = require('axios');
var passport = require('../passport');


router.get('/:id', getLocationsPage); // Retrieves selected location
router.post('/resultID/:id/:userid', postComment); // Posts a comment

function getLocationsPage(req, res, next) {
    axios.get(`http://api.workfrom.co/places/${req.params.id}?appid=${process.env.WORKFROM_API_KEY}`)
        .then(function(result) {
            venue = result.data.response;
            queries.Comments().where('loc_id', req.params.id)
                .then(function(data) {
                    for (var i in data) {
                      data[i].time = queries.timestamp(data[i].created_at);
                        if (req.isAuthenticated()) {
                            var userRole = req.user.role
                            if (
                                userRole != 'admin' || userRole == undefined) {
                                data[i].admin = false;
                            } else {
                                data[i].admin = true;
                            } //DO NOT DELETE THIS CURLY. THE CURLIES LOOK WEIRD HERE, BUT THEY ARE CORRECT
                        } else {
                            data[i].admin = false;
                        }
                    }
                    res.render('locations', {
                        venue: venue,
                        title: 'Office Anywhere',
                        brand: 'Office Anywhere',
                        comments: data,
                        admin: data.admin,
                        time:data.time,
                        resultID: venue[0].ID,
                        verified: req.isAuthenticated(),
                        user: req.user
                    })
                })
        })
}

function postComment(req, res, next) {
    var Id = req.params.id
    queries.addComments(req.body.title, req.body.body, req.params.userid, req.params.id)
        .then(function() {
            queries.Comments()
                .then(function(comments) {
                    res.redirect('/locations/' + Id)
                })
        })
}


module.exports = router;
