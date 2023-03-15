/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (u) => {
      u.increments("user_id");
      u.string("name").notNullable();
      u.string("nickname");
      u.string("surname").notNullable();
      u.string("email").notNullable().unique();
      u.string("password").notNullable();
      u.string("user_image").defaultTo(null);
    })
    .createTable("posts", (p) => {
      p.increments("post_id");
      p.string("post_name").notNullable();
      p.integer("liked").defaultTo(0);
      p.integer("comment").defaultTo(0);
      p.integer("user_id").notNullable().references("user_id").inTable("users");
    })
    .createTable("liked", (l) => {
      l.increments("liked_id");
      l.integer("user_id")
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      l.integer("post_id")
        .notNullable()
        .references("post_id")
        .inTable("posts")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("follows", (f) => {
      f.increments("follow_id");
      f.integer("follow").notNullable();
      f.integer("user_id")
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("follows")
    .dropTableIfExists("liked")
    .dropTableIfExists("posts")
    .dropTableIfExists("users");
};
