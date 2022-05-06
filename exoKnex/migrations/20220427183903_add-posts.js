export const up = async (knex) => {
  await knex.schema.createTable("posts", (table) => {
    table.increments("id");
    table.text("title").notNullable();
    table.text("content").notNullable();
    table.integer("userId").notNullable();
    table.foreign("userId").references("id").onTable("users");
    table.datetime("createAt").notNullable().defaultTo(knex.fn.now());
  });
  await knex.schema.createTable("comments", (table) => {
    table.increments("id");
    table.text("content").notNullable();
    table.datetime("createAt").notNullable().defaultTo(knex.fn.now());
    table.integer("postId").notNullable();
    table.integer("userId").notNullable();
    table.foreign("postId").references("id").onTable("posts");
    table.foreign("userId").references("id").onTable("users");
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable("comments");
  await knex.schema.dropTable("posts");
};
