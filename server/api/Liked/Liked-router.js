const router = require("express").Router();
const Liked = require("./Liked-model");
const Post = require("../Post/Post-model");
const mw = require("../../middleware/Liked/Liked");
const jwt = require("../../middleware/jwt");

router.post("/", jwt, mw.LikedCheck, async (req, res, next) => {
  try {
    const { post_id } = req.body;
    if (req.check) {
      await Post.dislikeUpdate(post_id);
      await Liked.remove({ post_id, user_id: req.user.user_id });

      return res.status(200).json({ message: "Beğeni geri çekildi" });
    } else {
      await Post.likeUpdate(post_id);
      return res.status(200).json({ message: "Beğenildi" });
    }
  } catch (error) {
    next(error);
  }
});
router.get("/:id", jwt, async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Liked.getLikedPost(id);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
