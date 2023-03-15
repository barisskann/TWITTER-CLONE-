const db = require("../../data/db-config");

function addFollow(data) {
  return db("follows").insert(data);
}

function checkFollow(data) {
  return db("follows").where(data).first();
}
function getFollows(data) {
  return db("follows").where(data);
}
function homeCheckFollows(id) {
  return db("follows as f").where("f.user_id", id);
}
function deleteFollow(data) {
  return db("follows").where(data).del();
}
function follow(id) {
  return db("follows as f")
    .leftJoin("users as u", "u.user_id", "f.follow")
    .where("f.user_id", id);
}
function followers(id) {
  return db("follows as f")
    .leftJoin("users as u", "u.user_id", "f.user_id")
    .where("f.follow", id);
}

module.exports = {
  addFollow,
  checkFollow,
  deleteFollow,
  getFollows,
  follow,
  followers,
  homeCheckFollows,
};
