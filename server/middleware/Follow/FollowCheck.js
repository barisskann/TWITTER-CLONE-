const Follow = require("../../api/Follow/FollowModel");
async function FollowCheck(req, res, next) {
  const data = await Follow.checkFollow({
    user_id: req.user.user_id,
    follow: req.body.id,
  });
  req.data = data;
  next();
}

module.exports = { FollowCheck };
