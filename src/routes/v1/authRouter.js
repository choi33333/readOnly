require("dotenv").config();
const { Router } = require("express");
const { authSignInValidator, authSignUpValidator, validateError } = require("../../middlewares/validators/index");
const authController = require("../../controllers/authController");

const router = Router();

// sign-up
router.post("/sign-up", authSignUpValidator, validateError, authController.signUp);

// sign-in
router.post("/sign-in", authSignInValidator, validateError, authController.signIn);


module.exports = router;
