const { Router, json } = require('express');
const { User } = require('../models'); // user model
const hashPassword = require('../utils/hash-password');
const router = Router();


// sign-up
router.post("/api/auth/sign-up", async (req, res) => {
  const { email, password, username, phoneNumber, address, addressDetail } = req.body;
  const hashedPassword = hashPassword(password);
  console.log(req.body);

  let user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({ error: "이미 가입된 email 입니다." });
  }

  user = await User.create({
    email: email,
    password: hashedPassword,
    username: username,
    phoneNumber: phoneNumber,
    address: address,
    addressDetail: addressDetail,
  });

  // 새로운 user를 db에 저장
  console.log("회원가입 완료!");
  res.redirect('/');
  
});

module.exports = router;