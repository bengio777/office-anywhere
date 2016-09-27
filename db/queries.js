


var knex = require('./knex.js')

function Comments() {
    return knex('comments').orderBy('id','desc');
}

function addComments(title,body){
  return knex("comments").insert({
    title:title,
    body:body,
  })
}


module.exports = {

    addComments: addComments,
    Comments: Comments
};
