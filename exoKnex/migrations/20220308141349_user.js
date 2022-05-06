export const up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("firstname").notNullable();
    table.string("lastname").notNullable();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.string("passwordSalt").notNullable();
  });
  await knex.schema.createTable("posts", (table) => {
    table.increments("id");
    table.string("comments").notNullable();
    table.string("post").notNullable();
    table.integer("users_id");
    table.foreign("users_id").references("id").inTable("users");
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable("posts");
  await knex.schema.dropTable("users");
};
