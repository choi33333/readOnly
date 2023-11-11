const { body } = require('express-validator');

// 주문정보 validation
const userOrderValidator = [
        body('orderedBy')
            .notEmpty()
            .trim()
            .withMessage('주문자 성함을 입력해주세요'),
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
        body('phoneNumber')
            .notEmpty()
            .withMessage('전화번호를 입력해주세요')
    ];
module.exports = userOrderValidator;