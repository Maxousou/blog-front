export const up = async (knex) => {
  await knex.schema.alterTable("users", (table) => {
    table.dateTime("suspendedAt");
  });
};

export const down = async (knex) => {
  await knex.schema.alterTable("users", (table) => {
    table.dropColumn("suspendedAt");
  });
};
