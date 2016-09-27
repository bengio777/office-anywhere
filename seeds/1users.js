
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({username: 'Tom', password: '123456', role: 'admin'}),
        knex('users').insert({username: 'Ben', password: '123456', role: 'admin'}),
      ]);
    });
};
