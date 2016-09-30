exports.up = function(knex, Promise) {
    return knex.schema.createTable('comments', function(table) {
        table.increments('id');
        table.integer('user_id');
        table.integer('loc_id');
        table.string('title');
        table.text('body');
        table.boolean('rec');
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('comments');
};
