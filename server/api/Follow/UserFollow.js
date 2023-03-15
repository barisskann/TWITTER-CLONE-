const router = require("express").Router();
const Follow = require("./FollowModel");
const mw = require("../../middleware/Follow/FollowCheck");
const jwt = require("../../middleware/jwt");

router.post("/", jwt, mw.FollowCheck, async (req, res, next) => {
  try {
    const { id } = req.body;
    if (req.data) {
      await Follow.deleteFollow({
        follow: id,
        user_id: req.user.user_id,
      });
      const follows = await Follow.getFollows({ user_id: req.user.user_id });
      return res.status(200).json(follows);
    } else {
      await Follow.addFollow({
        follow: id,
        user_id: req.user.user_id,
      });
      const data = await Follow.getFollows({ user_id: req.user.user_id });

      return res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
});
router.get("/", jwt, async (req, res, next) => {
  try {
    const data = await Follow.homeCheckFollows(req.user.user_id);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
