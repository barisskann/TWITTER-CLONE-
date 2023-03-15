const Liked = require("../../api/Liked/Liked-model");
async function LikedCheck(req, res, next) {
  const { post_id } = req.body;
  try {
    const data = await Liked.likedFilter({
      post_id,
      user_id: req.user.user_id,
    }).first();

    req.check = data;
    if (data) {
      next();
    } else {
      await Liked.addLiked({
        post_id,
        user_id: req.user.user_id,
      });
      next();
    }
  } catch (error) {
    console.log(error);
  }
}
module.exports = { LikedCheck };
