require("dotenv").config(); // config를 사용하면 필요 없음
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models");
const secret = process.env.SECRET; // config를 사용하자

const authService = {
  // 회원가입
  async signUp({
    email,
    password,
    username,
    phoneNumber,
    postCode,
    address,
    addressDetail,
  }) {
    const user = await UserModel.findOne({ email }).lean();
    if (user !== null) {
      const error = new Error("이미 가입된 email 입니다.");
      error.status = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await UserModel.create({
      email: email,
      password: hashedPassword,
      username: username,
      phoneNumber: phoneNumber,
      postCode: postCode,
      address: address,
      addressDetail: addressDetail,
      role: "customer",
    });

    return newUser.toObject();
  },

  // 로그인
  async signIn({ email, password }) {
    const users = await UserModel.findOne({ email }).lean();

    if (!users) {
      const error = new Error("이메일이나 비밀번호가 올바르지 않습니다.");
      error.status = 401;
      throw error;
    }

    let isValidUser = await bcrypt.compare(password, users.password);

    if (!isValidUser) {
      const error = new Error("이메일이나 비밀번호가 올바르지 않습니다.");
      error.status = 401;
      throw error;
    }

    const token = jsonwebtoken.sign(
      {
        em: users.email,
        ro: users.role,
      },
      secret,
      { expiresIn: "10h" }
    );

    return token;
  },
};

module.exports = authService;
