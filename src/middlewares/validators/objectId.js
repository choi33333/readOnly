const { param } = require('express-validator');

// 주문정보 validation
const objectIdValidator = (req, res, next) => {
    return [
        param('id')
            .isLength({ min : 24, max : 24 })
    ], next();
};

module.exports = objectIdValidator;