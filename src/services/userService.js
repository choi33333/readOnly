const { UserModel } = require("../models");
const bcrypt = require("bcrypt");

class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;

    // 스택 트레이스를 비워줌
    this.stack = '';
  }
}

const userService = {
  // my page
  async userMe(em) {
    const user = await UserModel.findOne({ email: em }).lean();

    if (!user) {
      const error = new Error("로그인 해주세요.");
      error.status = 401;
      throw error;
    }
    return user;
  },

  // my page[수정 전 비밀번호 확인]
  async userMePassCheck(email, password) {
    const user = await UserModel.findOne({ email }).lean();

    let isValidUser = await bcrypt.compare(password, user.password);

    if (!isValidUser) {
      const error = new Error("비밀번호가 일치하지 않습니다.");
      error.status = 401;
      throw error;
    }

    return;
  },

  // my page 수정
  async updateUserMe(email, data) {
    const { password, postCode, phoneNumber, address, addressDetail } = data;
    const user = await UserModel.findOne({ email }).lean();

    if (!user) {
      const error = new Error("로그인 해주세요.");
      error.status = 404;
      throw error;
    }

    let hashedPassword = await bcrypt.hash(password, 12);

    let isValidUser = await bcrypt.compare(password, user.password);
    
    if (password === "" || password === undefined || password === null) {
      hashedPassword = user.password;
    }

    if (isValidUser) {
      const error = new Error("동일한 비밀번호 입니다.");
      error.status = 400;
      throw error;
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      {
        password: hashedPassword,
        phoneNumber: phoneNumber,
        postCode: postCode,
        address: address,
        addressDetail: addressDetail,
      },
      { new: true, runValidators: true }
    );
    return updatedUser;
  },

  // 탈퇴
  async deleteUserMe(email) {
    const deletedUser = await UserModel.findOneAndDelete({ email });

    if (deletedUser === null) {
      const error = new Error("해당 유저가 없습니다");
      error.status = 404;
      return next(error);
    }

    return deletedUser;
  },
};

module.exports = userService;
