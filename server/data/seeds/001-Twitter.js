/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("posts").truncate();

  await knex("users").truncate();

  await knex("users").insert([
    {
      user_image:
        "https:media.licdn.com/dms/image/C4E03AQEorhg_pXDvmw/profile-displayphoto-shrink_400_400/0/1612991949209?e=1684368000&v=beta&t=sBadhrPxAh3P1hmmquFLBa_o7NyVuw-4wf8Fy6pRT-M",
      name: "Barış",
      surname: "kan",
      email: "bars_958@hotmail.com",
      password: "$2b$12$3/iJEXh3kdYzQMxmZY7MTusHc4bskdy3spJF77AQOLikSZPbTkFR6", //19032008
    },
    {
      user_image:
        "https://i.pinimg.com/originals/63/43/5e/63435e79028bfbbf6cd218c6908c0249.png",
      name: "Sena",
      surname: "Adıgüzel",
      email: "sena@gmail.com",
      password: "$2b$12$3/iJEXh3kdYzQMxmZY7MTusHc4bskdy3spJF77AQOLikSZPbTkFR6", //19032008
    },
  ]);

  await knex("posts").insert([{ user_id: 1, post_name: "POST 1 VARAN" }]);
};
