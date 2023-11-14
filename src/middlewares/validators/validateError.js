const { validationResult } = require('express-validator');

// 에러 반환 
const validateError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  };
  next(); // 다음 미들웨어 또는 라우터 핸들러 함수로 진행
};

module.exports = validateError;
