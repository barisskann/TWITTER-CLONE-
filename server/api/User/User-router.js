const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mw = require("../../middleware/User/SignupCheck");
const User = require("./User-model");
router.post(
  "/signup",
  mw.SignupinputCheck,
  mw.emailCheck,
  async (req, res, next) => {
    try {
      const hash = await bcrypt.hash(req.body.password, 12);
      req.body.password = hash;
      const data = await User.addUser(req.body);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
);
router.post("/signin", mw.signinEmailcheck, async (req, res, next) => {
  try {
    const comp = await bcrypt.compare(req.body.password, req.user.password);
    if (comp) {
      const token = jwt.sign(
        { user_id: req.user.user_id },
        process.env.SECRET_KEY || "ssh",
        {
          expiresIn: "1d",
        }
      );
      return res.status(200).json(token);
    } else {
      return res
        .status(400)
        .json({ message: "Kullanıdı Adı veya Şifre HATALI" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
