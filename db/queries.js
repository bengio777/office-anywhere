var knex = require('./knex')

function Comments() {
    return knex('comments');
}


module.exports = {
    Comments
};
