const { Router } = require("express");
const { objectIdValidator, validateError } = require("../../../middlewares/validators/index");
const adminController = require("../../../controllers/adminController");
const asyncHandler = require("../../../utils/asyncHandler");


const router = Router();

// user 조회
router.get("/", asyncHandler(adminController.getUser));

// user 삭제
router.delete("/:id", objectIdValidator, validateError, asyncHandler(adminController.deleteUser));

module.exports = router;
