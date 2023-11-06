const { Router } = require("express");
const { UserModel } = require("../models");
const router = Router();

// user 조회
router.get("/api/users", async (req, res, next) => {
  const users = await UserModel.find({}).lean();

  if(!users){
    const error = new Error ()
  }
  res.json({
    error: null,
    data: users,
  });
});

// user 삭제
router.delete("/api/users/me", async (req, res, next) => {
  const { em } = res.locals.user;
  const user = await UserModel.findOne({ email: em }).lean();
  console.log(user);
  const { phoneNumber, address, addressDetail } = req.body;

  const updatedUser = await UserModel.updateOne(
    { email : em },
    {
      phoneNumber: phoneNumber,
      address: address,
      addressDetail: addressDetail,
    }
  );

  res.json({
    error: null,
    data: updatedUser,
  });
});

module.exports = router;