const { Router } = require("express");
const { User } = require("../models/index"); // user model
const router = Router();
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secret = "bpD6HJhBWhGFmmnpB9tf"; 

// sign-in

router.post("/api/auth/sign-in", async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ error: "이메일이나 비밀번호가 올바르지 않습니다."});
  }

  let isValidUser = await bcrypt.compare(password, user.password);

  if (!isValidUser) {
    return res.status(401).json({ error: "이메일이나 비밀번호가 올바르지 않습니다." });
  }

  const token = jsonwebtoken.sign(
    {
      em: user.email,
      pe: user.permission,
    },
    secret,
    { expiresIn: "1h" }
  );

  res.status(401).json({ message: "로그인에 성공했습니다"});
});

// sign-up

router.post("/api/auth/sign-up", async (req, res) => {
  const { email, password, username, phoneNumber, address, addressDetail } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({ error: "이미 가입된 email 입니다." });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  user = await User.create({
    email: email,
    password: hashedPassword,
    username: username,
    phoneNumber: phoneNumber,
    address: address,
    addressDetail: addressDetail,
  });

});

module.exports = router;
