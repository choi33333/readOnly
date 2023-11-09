const { UserModel } = require("../models");
const bcrypt = require("bcrypt");

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
  async userMePassCheck(em, password) {
    const user = await UserModel.findOne({ email: em }).lean();

    let isValidUser = await bcrypt.compare(password, user.password);

    if (!isValidUser) {
      const error = new Error("비밀번호가 일치하지 않습니다.");
      error.status = 401;
      throw error;
    }

    return;
  },

  // my page 수정
  async updateUserMe(em, data) {
    const { password, postCode, phoneNumber, address, addressDetail } = data;
    const user = await UserModel.findOne({ email: em }).lean();

    if (!user) {
      const error = new Error("로그인 해주세요.");
      error.status = 404;
      throw error;
    }

    let hashedPassword = await bcrypt.hash(password, 12);

    let isValidUser = await bcrypt.compare(password, user.password);
    
    if (password == "") {
      hashedPassword = user.password;
    }

    if (isValidUser) {
      const error = new Error("동일한 비밀번호 입니다.");
      error.status = 401;
      throw error;
    }

    const updatedUser = await UserModel.updateOne(
      { email: em },
      {
        password: hashedPassword,
        phoneNumber: phoneNumber,
        postCode: postCode,
        address: address,
        addressDetail: addressDetail,
      }
    );
    return updatedUser;
  },

  // 탈퇴
  async deleteUserMe(em) {
    const deletedUser = await UserModel.deleteOne({ email: em });

    if (!deletedUser) {
      const error = new Error("로그인 해주세요.");
      error.status = 401;
      return next(error);
    }

    return deletedUser;
  },
};

module.exports = userService;
