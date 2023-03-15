const User = require("../../api/User/User-model");

function SignupinputCheck(req, res, next) {
  const { name, surname, email, password } = req.body;
  if (!name || !surname || !email || !password) {
    return res.status(400).json({ message: "Eksik Bilgiler Bulunmaktadır" });
  } else next();
}
async function emailCheck(req, res, next) {
  const { email } = req.body;
  const data = await User.emailCheck(email);
  if (data) {
    return res.status(400).json({ message: "KULLANICI BULUNMAKTADIR" });
  } else next();
}
async function signinEmailcheck(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Bilgileri Doldurunuz" });
  }
  const data = await User.emailCheck(email);
  if (!data) {
    return res
      .status(400)
      .json({ message: "Kullanıcı adı veye Parola HATALI" });
  } else {
    req.user = data;
    next();
  }
}

module.exports = {
  SignupinputCheck,
  emailCheck,
  signinEmailcheck,
};
