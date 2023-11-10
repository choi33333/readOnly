const { body } = require('express-validator');

// 회원가입 validation
const authSignUpValidator = [
        body('email')
            .notEmpty()
            .withMessage('이메일을 입력해주세요')
            .trim()
            .isEmail()
            .withMessage('이메일 형식이 올바르지 않습니다.'),
        body('password')
            .notEmpty()
            .withMessage('비밀번호를 입력해주세요')
            .trim()
            .isLength({ min: 8 })
            .withMessage('비밀번호는 8자리 이상이어야 합니다.'),
        body('username')
            .notEmpty()
            .withMessage('이름을 입력해주세요')
            .isLength({ min : 2 })
            .trim(),
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
        ];

// 로그인 validation
const authSignInValidator = (req, res, next) => {
    return [
        body('email')
            .notEmpty()
            .withMessage('이메일을 입력해주세요'),
        body('password')
            .notEmpty()
            .isLength({ min : 8 })
            .withMessage('비밀번호를 입력해주세요')
    ], next();
};

module.exports = { authSignUpValidator, authSignInValidator };