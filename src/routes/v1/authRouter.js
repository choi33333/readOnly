require("dotenv").config();
const { Router } = require("express");
const { authSignInValidator, authSignUpValidator, validateError } = require("../../middlewares/validators/index");
const authController = require("../../controllers/authController");

const router = Router();

// sign-up
router.post("/sign-up", authSignUpValidator, validateError, authController.authSignUp);

// sign-in
router.post("/sign-in", authSignInValidator, validateError, authController.authSignIn);


module.exports = router;