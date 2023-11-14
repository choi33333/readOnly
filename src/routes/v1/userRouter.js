const { Router } = require("express");
const isAuthenticated = require('../../middlewares/isAuthenticated');
const { validateError, userMeValidator } = require('../../middlewares/validators/index');
const userController = require("../../controllers/userController");
const asyncHandler = require("../../utils/asyncHandler");

const router = Router();

// my page
router.get("/me", isAuthenticated, asyncHandler(userController.userMe));

// my page passwordCheck
router.post("/me/passcheck", isAuthenticated, asyncHandler(userController.userMePassCheck));

// my page 수정
router.put("/me", isAuthenticated, userMeValidator, validateError, asyncHandler(userController.updateUserMe));

// 탈퇴
router.delete("/withdraw", isAuthenticated, asyncHandler(userController.deleteUserMe));

module.exports = router;
