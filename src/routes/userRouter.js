const { Router } = require("express");
const { UserModel } = require("../models/index");
const router = Router();

// my page
router.get("/api/users/me", async (req, res) => {
  const { em } = res.locals.user;
  const user = await UserModel.findOne({ email: em }).lean();

  res.json({
    error: null,
    data: user,
  });
});

// my page 수정
router.put("/api/users/me", async (req, res, next) => {
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