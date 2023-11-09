const { Router } = require("express");
const isAuthenticated = require('../../middlewares/isAuthenticated');
const { validateError, userMeValidator } = require('../../middlewares/validators/index');
const userController = require("../../controllers/userController");

const router = Router();

// my page
router.get("/me", isAuthenticated, userController.userMe);

// my page passwordCheck
router.post("/me/passcheck", isAuthenticated, userController.userMePassCheck);

// my page 수정
router.put("/me", isAuthenticated, userMeValidator, validateError, userController.updateUserMe);

// 탈퇴
router.delete("/withdraw", isAuthenticated, userController.deleteUserMe);

module.exports = router;