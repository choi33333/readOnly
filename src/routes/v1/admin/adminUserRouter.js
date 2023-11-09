const { Router } = require("express");
const { objectIdValidator, validateError } = require("../../../middlewares/validators/index");
const adminController = require("../../../controllers/adminController");
const router = Router();

// user 조회
router.get("/", adminController.getUser);

// user 삭제
router.delete("/:id", objectIdValidator, validateError, adminController.deleteUser);

module.exports = router;
