"use strict";

var knex = require('./knex.js')

function Users() {
  return knex("users")
}

function AddUser(username, password){
  return knex("users").insert({
    username: username.toLowerCase(),
    password: password
  })
}

function Comments() {
    return knex('comments').orderBy('id','desc');
}

function indvComments(){
  return knex('users').join('comments', 'users.id', 'comments.user_id')
}

function addComments(title,body){
  return knex("comments").insert({
    title:title,
    body:body,
  })
}

function updateComments(id, title, body){
  return knex('comment').where({
    id: id
  }).update({
    title: title,
    body: body
  })
}

function deleteComments(id){
  return knex('comment').where({
    id: id
  })
}


module.exports = {
    Users: Users,
    AddUser: AddUser,
    Comments: Comments,
    addComments: addComments,
    updateComments: updateComments,
    deleteComments: deleteComments
};
