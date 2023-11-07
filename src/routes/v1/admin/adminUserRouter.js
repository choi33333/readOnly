const { Router } = require("express");
const { UserModel } = require("../../../models");
const validateError = require("../../../middlewares/validators/validateError");
const objectIdValidator = require("../../../middlewares/validators/objectId");
const router = Router();

// user 조회
router.get("/", async (req, res, next) => {
  const users = await UserModel.find({}).lean();

  if (!users) {
    const error = new Error("사용자가 없습니다.");
    error.status = 404;
    return next(error);
  }

  res.json({
    error: null,
    data: users,
  });
});

// user 삭제
router.delete("/:id", objectIdValidator, validateError, async (req, res, next) => {
  const id = req.params.id;

  const deletedUser = await UserModel.deleteOne({ _id: id })
    .lean();

  if (!deletedUser || deletedUser.length === 0) {
    const error = new Error("사용자가 존재하지 않습니다.");
    error.status = 404;
    return next(error);
  }

  res.json({
    error: null,
    data: deletedUser,
    message: "사용자가 삭제되었습니다.",
  });
});

module.exports = router;
