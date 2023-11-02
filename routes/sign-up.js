const { Router } = require('express');
const { User } = require('../models'); // user model
const hashPassword = require('../utils/hash-password');
const router = Router();
const jsonwebtoken = require("jsonwebtoken");
const secret = "bpD6HJhBWhGFmmnpB9tf"; // JWT 서명을 위한 임의의 secret 값


// sign-up
router.post("/api/auth/sign-up", async (req, res) => {
  const { email, password, username, phoneNumber, address, addressDetail } = req.body;
  console.log(req.body);

  let user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({ error: "이미 가입된 email 입니다." });
  }

  const hashedPassword = hashPassword(password);

  user = await User.create({
    email: email,
    password: hashedPassword,
    username: username,
    phoneNumber: phoneNumber,
    address: address,
    addressDetail: addressDetail,
  });

  const token = jsonwebtoken.sign(
    {
      em: user.email,
      pe: user.permission,
    },
    secret,
    { expiresIn: "1h" } // 본 토큰은 1시간 동안만 유효하다!!
  );

  // 새로운 user를 db에 저장
  console.log("회원가입 완료!");
  res.redirect('/');
  
});

module.exports = router;