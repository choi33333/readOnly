const { Router } = require("express");
const { UserModel } = require("../models");
const router = Router();

// my page
router.get("/api/users/me", async (req, res, next) => {
  const { em } = res.locals.user;
  const user = await UserModel.findOne({ email: em }).lean();

  if (!user) {
    const error = new Error("로그인 해주세요.");
    error.status = 401;
    return next(error);
  };

  res.json({
    error: null,
    data: user,
  });
});

// my page 수정
router.put("/api/users/me", async (req, res, next) => {
  const { em } = res.locals.user;
  const { postCode, phoneNumber, address, addressDetail } = req.body;

  if (!user) {
    const error = new Error("로그인 해주세요.");
    error.status = 401;
    return next(error);
  };

  const updatedUser = await UserModel.updateOne(
    { email : em },
    {
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
router.delete("/api/users/withdraw", async (req, res, next) => {
    const { em } = res.locals.user;
    const deletedUser = await UserModel.deleteOne({ email : em });
  
    if (!user) {
        const error = new Error("로그인 해주세요.");
        error.status = 401;
        return next(error);
    };

    res.json({
      message: "안녕히가세요. 다음에 또 만나요!",
      error: null,
      data: deletedUser,
    });
  });
  

module.exports = router;