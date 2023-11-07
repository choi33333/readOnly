const { validationResult } = require("express-validator");

// 에러 반환 
const validateError = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }
   return res.status(400).json({ message : errors.array()[0].msg });
};

module.exports = validateError;