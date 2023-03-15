const db = require("../../data/db-config");
function getPost(id) {
  return db("posts").where("post_id", id).first();
}

function getPosts(params) {
  return db("posts as p")
    .leftJoin("users as u", "u.user_id", "p.user_id")
    .select("p.*", "u.*")
    .orderBy("p.post_id", "desc");
}
function getByIdPost(data) {
  return db("posts as p").where(data).first();
}
function getMyPosts(id) {
  return db("posts as p")
    .leftJoin("users as u", "u.user_id", "p.user_id")
    .select("p.*", "u.*")
    .where("p.user_id", id)
    .orderBy("p.post_id", "desc");
}
async function updatePost(id, post) {
  return db("posts as p").where(id).update(post);
}
function addPost(data) {
  return db("posts")
    .insert(data)
    .then((r) => getPosts(data.user_id).where({ post_id: r[0] }).first());
}
async function likeUpdate(id) {
  const data = await getPost(id);
  return db("posts")
    .where("post_id", id)
    .update({ liked: data.liked + 1 });
}
async function dislikeUpdate(id) {
  const data = await getPost(id);
  return db("posts")
    .where("post_id", id)
    .update({ liked: data.liked - 1 });
}
function orderPostGundem(params) {
  return db("posts as p")
    .leftJoin("users as u", "u.user_id", "p.user_id")
    .orderBy("p.liked", "desc")
    .limit(5);
}
function deletePost(filter) {
  return db("posts").where(filter).del();
}
module.exports = {
  updatePost,
  getByIdPost,
  deletePost,
  getPosts,
  addPost,
  getMyPosts,
  likeUpdate,
  dislikeUpdate,
  orderPostGundem,
};
