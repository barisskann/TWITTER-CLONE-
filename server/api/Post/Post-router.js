const router = require("express").Router();
const Follow = require("../Follow/FollowModel");
const Liked = require("../Liked/Liked-model");
const jwt = require("../../middleware/jwt");
const mw = require("../../middleware/Post/Post");
const User = require("../User/User-model");
const Post = require("./Post-model");
router.get("/", jwt, async (req, res, next) => {
  try {
    const data = await Post.getPosts();
    const ds = await Liked.getLikeds(req.user.user_id);
    let model = {
      data: data,
      likedPost: ds,
    };
    return res.status(200).json(model);
  } catch (error) {
    next(error);
  }
});
router.post("/update", jwt, async (req, res, next) => {
  try {
    const data = await Post.getByIdPost({
      user_id: req.user.user_id,
      post_id: req.body.id,
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
});
router.post("/", jwt, mw.checkInput, async (req, res, next) => {
  try {
    const data = await Post.addPost(req.body);
    return res.status(200).json({ message: "Post Oluşturuldu" });
  } catch (error) {
    next(error);
  }
});
router.get("/person", jwt, async (req, res, next) => {
  try {
    const data = await Post.getMyPosts(req.user.user_id);
    const user = await User.getById(req.user.user_id);
    const getLiked = await Liked.getLikeds(req.user.user_id);
    return res.status(200).json({ data, getLiked, user });
  } catch (error) {
    next(error);
  }
});
router.put("/", jwt, async (req, res, next) => {
  try {
    await Post.updatePost(
      { user_id: req.user.user_id, post_id: req.body.post_id },
      { post_name: req.body.post_name }
    );
    return res.status(200).json({ message: "Post Güncellendi" });
  } catch (error) {
    next(error);
  }
});

router.get("/gundem", jwt, async (req, res, next) => {
  try {
    const data = await Post.orderPostGundem();
    const liked = await Liked.getLikeds(req.user.user_id);
    return res.status(200).json({ data, liked });
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", jwt, async (req, res, next) => {
  try {
    const deletePost = await Post.deletePost({
      user_id: req.user.user_id,
      post_id: req.params.id,
    });
    return res.status(200).json({ message: "Post Başarıyla silinmiştir" });
  } catch (error) {
    next(error);
  }
});
router.get("/:id", jwt, async (req, res, next) => {
  try {
    const { id } = req.params;

    const follow = await Follow.follow(id);
    const followers = await Follow.followers(id);

    const follower = await Follow.getFollows({
      user_id: req.user.user_id,
    });
    const data = await Post.getMyPosts(id);
    const user = await User.getById(id);
    const liked = await Liked.getLikeds(req.user.user_id);
    return res
      .status(200)
      .json({ data, user, liked, follower, follow, followers });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
