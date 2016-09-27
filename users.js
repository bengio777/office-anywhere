
"use strict";
var bcrypt = require("bcrypt")
var query = require("./queries")
var passport = require('./passport');
var flash = require('connect-flash');


function hashedpass(password) {
    return bcrypt.hashSync(password, 10)
}

function findUser(username) {
          return query.Users().first().where({
                 username: username.toLowerCase(),
             })
}

function authenticateUser(username, password) {
    return findUser(username)
    .then(function(user){
      if(user){
      return bcrypt.compareSync(password,user.password)
    }
    })

}
function confirmpassword(username,password,password1){
  if(password == password1){
    return findUser(username)
  }else{
    throw new Error("Please confirm your password.")
  }
}
function Register(username,password,password1) {
  return confirmpassword(username,password,password1)
    .then(function(data){
      if(!data){
        var hash=hashedpass(password)
        return query.AddUser(username,hash);
      }
      else{
        throw new Error("Username already exists.")
      }
  })
  .catch(function(error){
    return error;
  })
}

module.exports = {
    findUser: findUser,
    Register: Register,
    authenticateUser: authenticateUser,
}
