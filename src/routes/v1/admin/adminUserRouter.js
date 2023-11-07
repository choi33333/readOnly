const { Router } = require("express");
const { UserModel } = require("../../../models");
const isAdmin = require("../../../middlewares/admin");
const router = Router();

// user 조회
router.get("/",isAdmin , async (req, res, next) => {
  const users = await UserModel.find({}).lean();

  if (!users) {
    const error = new Error("사용자가 없습니다.");
    error.status = 403;
    return next(error);
  }

  res.json({
    error: null,
    data: users,
  });
});

// user 삭제
router.delete("/:id",isAdmin , async (req, res, next) => {
  const id = req.params.id;
  const deletedUser = await UserModel.deleteOne({ _id: id }).lean();

  res.json({
    error: null,
    data: deletedUser,
  });
});

module.exports = router;
