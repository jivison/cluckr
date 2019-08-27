
exports.up = function(knex) {
    return knex.schema.createTable("tags", table => {
        table.bigIncrements("id");
        table.string("tag");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable("tags")
};
