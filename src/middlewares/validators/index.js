const objectIdValidator = require('./objectId');
const { authSignUpValidator, authSignInValidator } = require('./auth');
const userOrderValidator = require('./order');
const addProductValidator = require('./product');
const userMeValidator = require('./user');
const validateError = require('./validateError');


module.exports = { 
    objectIdValidator,
    authSignUpValidator, 
    authSignInValidator,
    userOrderValidator,
    addProductValidator,
    userMeValidator,
    validateError,
};