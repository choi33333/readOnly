const { body } = require('express-validator');

// 마이페이지 수정
const userMeValidator = [
        body('phoneNumber')
            .notEmpty()
            .withMessage('전화번호를 입력해주세요'),
        body('postCode')
            .notEmpty()
            .trim()
            .withMessage('우편번호를 입력해주세요'),
        body('address')
            .notEmpty()
            .withMessage('주소를 입력해주세요')
        ];

module.exports = userMeValidator;