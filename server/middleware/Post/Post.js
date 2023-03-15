function checkInput(req, res, next) {
  const { post_name, user_id } = req.body;
  if (!post_name || post_name === "") {
    return res.status(400).json({ message: "Lütfen Post Oluşturunuz" });
  }
  if (!user_id) {
    return res.status(400).json({ message: "Giriş Hatası" });
  } else {
    next();
  }
}
module.exports = { checkInput };
