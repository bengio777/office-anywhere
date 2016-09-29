
var knex = require('./knex.js')

function Comments() {
    return knex("users").join("comments","users.id","comments.user_id ")
}

function indvComments(){
  return knex('users').join('comments', 'users.id', 'comments.user_id')
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

    Comments: Comments,
    addComments: addComments,
    updateComments: updateComments,
    deleteComments: deleteComments

};
