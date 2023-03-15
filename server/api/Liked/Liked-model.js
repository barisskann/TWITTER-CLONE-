const db = require("../../data/db-config");

function likedFilter(data) {
  return db("liked")
    .where({ user_id: data.user_id })
    .andWhere({ post_id: data.post_id });
}
function getLikedPost(id) {
  return db("liked as l")
    .leftJoin("users as u", "u.user_id", "l.user_id")
    .where("l.post_id", id);
}

function getLikeds(id) {
  return db("liked").where("user_id", id);
}

function addLiked(data) {
  return db("liked").insert(data);
}
function remove(data) {
  return db("liked").where(data).del();
}
module.exports = { likedFilter, addLiked, remove, getLikeds, getLikedPost };
