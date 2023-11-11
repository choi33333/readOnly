const { body } = require('express-validator');

// 상품 추가 validation
const addProductValidator = [
        body('name')
            .notEmpty()
            .withMessage('상품명을 입력해주세요'),
        body('category')
            .notEmpty()
            .withMessage('카테고리를 선택해주세요'),
        body('author')
            .notEmpty()
            .withMessage('저자를 입력해주세요'),
        body('price')
            .notEmpty()
            .isNumeric()
            .withMessage('가격을 입력해주세요'),
        body('imageUrl')
            .notEmpty()
            .withMessage('상품 사진을 넣어주세요'),
        body('releasedDate')
            .notEmpty()
            .withMessage('발행일을 입력해주세요')
    ];

module.exports = addProductValidator;