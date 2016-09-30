exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('comments').del()
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex('comments').insert({
                    title: 'Meh',
                    body: 'It is okay, I guess',
                    rec: true
                }),
                knex('comments').insert({
                    title: 'Huh?',
                    body: 'I guess it is okay.',
                    rec: false
                })
            ]);
        });
};
