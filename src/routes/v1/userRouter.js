const { Router } = require("express");
const { UserModel } = require("../../models");
const isAuthenticated = require('../../middlewares/isAuthenticated');
const { validateError, userMeValidator } = require('../../middlewares/validators/index');
const router = Router();
const bcrypt = require("bcrypt");


// my page
router.get("/me", isAuthenticated, async (req, res, next) => {
  const { em } = res.locals.user;
  const user = await UserModel.findOne({ email: em }).lean();

  if (!user) {
    const error = new Error("로그인 해주세요.");
    error.status = 401;
    return next(error);
  }

  res.json({
    error: null,
    data: user,
  });
});

// my page passwordCheck
router.post("/me/passcheck", isAuthenticated, async (req, res, next) => {
  const { em } = res.locals.user;
  const { password } = req.body;
  const user = await UserModel.findOne({ email: em }).lean();

  let isValidUser = await bcrypt.compare(password, user.password);

  if (!isValidUser) {
    const error = new Error("비밀번호가 일치하지 않습니다.");
    error.status = 401;
    return next(error);
  }

  res.json({
    error: null,
    message: "비밀번호가 일치합니다."
  });
});

// my page 수정
router.put("/me", isAuthenticated, userMeValidator, validateError,  async (req, res, next) => {
  const { em } = res.locals.user;
  const user = await UserModel.findOne({ email: em }).lean();
  const { password, postCode, phoneNumber, address, addressDetail } = req.body;

  if (!user) {
    const error = new Error("로그인 해주세요.");
    error.status = 404;
    return next(error);
  }

  let hashedPassword = await bcrypt.hash(password, 12);

  let isValidUser = await bcrypt.compare(password, user.password);

  if (password == ''){
    hashedPassword = user.password;
  }

  if (isValidUser) {
    const error = new Error("동일한 비밀번호 입니다.");
    error.status = 401;
    return next(error);
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

  res.json({
    error: null,
    data: updatedUser,
  });
});

// my page 삭제
router.delete("/withdraw", isAuthenticated, async (req, res, next) => {
  const { em } = res.locals.user;
  const deletedUser = await UserModel.deleteOne({ email: em });

  if (!deletedUser) {
    const error = new Error("로그인 해주세요.");
    error.status = 401;
    return next(error);
  }

  res.json({
    message: "안녕히가세요. 다음에 또 만나요!",
    error: null,
    data: deletedUser,
  });
});

module.exports = router;
