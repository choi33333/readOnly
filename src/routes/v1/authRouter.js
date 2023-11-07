const { Router } = require("express");
const { UserModel } = require("../../models"); // user model
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = Router();

require("dotenv").config();
const secret = process.env.SECRET;

// sign-in

router.post("/sign-in", async (req, res, next) => {
  const { email, password } = req.body;

  const users = await UserModel.findOne({ email }).lean();

  if (!users) {
    const error = new Error("이메일이나 비밀번호가 올바르지 않습니다.");
    error.status = 401;
    return next(error);
  }

  let isValidUser = await bcrypt.compare(password, users.password);

  if (!isValidUser) {
    const error = new Error("이메일이나 비밀번호가 올바르지 않습니다.");
    error.status = 401;
    return next(error);
  }

  const token = jsonwebtoken.sign(
    {
      em: users.email,
      ro: users.role,
    },
    secret,
    { expiresIn: "10h" }
  );

  res.json({
    error: null,
    data: token,
    message: "로그인에 성공했습니다",
  });
});

// sign-up

router.post("/sign-up", async (req, res, next) => {
  const {
    email,
    password,
    username,
    phoneNumber,
    postCode,
    address,
    addressDetail,
  } = req.body;

  let users = await UserModel.findOne({ email }).lean();

  if (users) {
    const error = new Error("이미 가입된 email 입니다.");
    error.status = 409;
    return next(error);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  users = await UserModel.create({
    email: email,
    password: hashedPassword,
    username: username,
    phoneNumber: phoneNumber,
    postCode: postCode,
    address: address,
    addressDetail: addressDetail,
    role: "customer",
  });

  res.json({
    message: "회원가입에 성공했습니다",
    error: null,
    data: deletedUser,
  });
});

module.exports = router;
