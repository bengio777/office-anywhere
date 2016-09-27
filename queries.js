"use strict";
var knex = require("./db_connection")
module.exports = {
  Users: function() {
        return knex("users")
    },
  AddUser: function( username, password) {
        return knex("users").insert({
            username: username.toLowerCase(),
            password: password,
        })
    },



}
