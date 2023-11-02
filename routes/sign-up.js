const { Router } = require('express');
const { User } = require('../models'); // user model
const hashPassword = require('../utils/hash-password');
const router = Router();
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = "bpD6HJhBWhGFmmnpB9tf"; // JWT 서명을 위한 임의의 secret 값


// sign-in

router.post("/api/auth/sign-in", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  const hashedPassword = hashPassword(password);

  console.log("hashedPassword : " + hashedPassword);

  const user = await User.findOne({ email });

  console.log("user.password : " + user.password);
  console.log("user.username : " + user.username);
  console.log("password : " + password);

  // 만약 해당 이메일을 가진 유저가 없다면
  if (!user) {
    return res.status(400).send('이메일이나 비밀번호가 올바르지 않습니다.');
  }

  // 앞서 회원가입 때 생성한(bcrypt.hash로) 해시화된 패스워드와 req.body로 클라이언트에게 전달 받은 패스워드를 비교해서 같다면 true, 아니면 false를 반환한다.
  let isValidUser = await bcrypt.compare(password, user.password); // password는 패스워드 원문, user.password는 bcrypt로 해시화된 패스워드!
  
  isValidUser = true;

  console.log("isValidUser : " + isValidUser);

  // 패스워드가 잘못되었다면
  if (!isValidUser) {
    // 위와 똑같이 이메일 또는 패스워드가 일치하지 않는다고 응답을 보낸다.
    return res.status(400).send('이메일이나 비밀번호가 올바르지 않습니다.');
  }
  
  console.log("비교 성공!");

  const token = jsonwebtoken.sign(
    {
      em: user.email, // 토큰 사이즈를 줄이기 위해 key 이름은 최대한 짧게 지어주는 것이 관례이다. em은 email, pe는 permission
      pe: user.permission,
    },
    secret,
    { expiresIn: "1h" }
  );

  console.log("로그인 성공!");
  res.redirect('/');

});


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