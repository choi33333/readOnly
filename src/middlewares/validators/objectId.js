const { param } = require('express-validator');

// 주문정보 validation
const objectIdValidator = [
        param('id')
            .isLength({ min : 24, max : 24 })
    ];

module.exports = objectIdValidator;