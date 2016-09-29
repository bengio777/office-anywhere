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
    return knex("users").join("comments","users.id","comments.user_id ")
}


function comment(id) {
  return knex('comments').where('id', id)
}

function addComments(title,body,user_id,loc_id){
  return knex("comments").insert({
    title:title,
    body:body,
    user_id:user_id,
    loc_id:loc_id
  })
}

function updateComments(id, title, body){
  return knex('comments').where({
    id: id
  }).update({
    title: title,
    body: body
  })
}

function deleteComments(id){
  return knex('comments').where({
    id: id,
  }).del()
}


module.exports = {
    Users: Users,
    AddUser: AddUser,
    Comments: Comments,
    addComments: addComments,
    updateComments: updateComments,
};
