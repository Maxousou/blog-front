export const up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.text("email").notNullable();
    table.text("passwordHash").notNullable();
    table.text("passwordSalt").notNullable();
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable("users");
};
