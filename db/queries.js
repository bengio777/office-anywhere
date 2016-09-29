
var knex = require('./knex.js')

function Comments() {
    return knex('comments').orderBy('id','desc');
}


function comment(id) {
  return knex('comments').where('id', id)
}

function addComments(title,body){
  return knex("comments").insert({
    title:title,
    body:body,
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

    Comments: Comments,
    addComments: addComments,
    updateComments: updateComments,
    deleteComments: deleteComments,
    comment: comment,

};
