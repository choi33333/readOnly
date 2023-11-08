const { body } = require('express-validator');

// 회원가입 validation
const userMeValidator = (req, res, next) => {
    return [
        body('phoneNumber')
            .notEmpty()
            .withMessage('전화번호를 입력해주세요'),
        body('postCode')
            .notEmpty()
            .trim()
            .withMessage('우편번호를 입력해주세요'),
        body('address')
            .notEmpty()
            .withMessage('주소를 입력해주세요'),
        body('addressDetail')
            .notEmpty()
            .withMessage('상세주소를 입력해주세요'),
        ], next();
};

module.exports = userMeValidator;