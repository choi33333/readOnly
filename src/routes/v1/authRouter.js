require("dotenv").config();
const { Router } = require("express");
const { authSignInValidator, authSignUpValidator, validateError } = require("../../middlewares/validators/index");
const authController = require("../../controllers/authController");
const asyncHandler = require("../../utils/asyncHandler");

const router = Router();

// sign-up
router.post("/sign-up", authSignUpValidator, validateError, asyncHandler(authController.authSignUp));

// sign-in
router.post("/sign-in", authSignInValidator, validateError, asyncHandler(authController.authSignIn));


module.exports = router;