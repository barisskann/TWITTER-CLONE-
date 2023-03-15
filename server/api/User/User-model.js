const db = require("../../data/db-config");
function getById(id) {
  return db("users").where({ user_id: id }).first();
}
function emailCheck(data) {
  return db("users").where({ email: data }).first();
}
function getUserLikedPosts(user_id) {
  return db("liked").where("user_id", user_id);
}
function addUser(data) {
  return db("users")
    .insert(data)
    .then((r) => getById(r[0]));
}

module.exports = { addUser, emailCheck, getById, getUserLikedPosts };
