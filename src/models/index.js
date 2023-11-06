const mongoose = require('mongoose');

const user = require('./schemas/user');
const category = require('./schemas/category');
const product = require('./schemas/product');
const order = require('./schemas/order');

module.exports.UserModel = mongoose.model('user', user);
module.exports.CategoryModel = mongoose.model('category', category);
module.exports.ProductModel = mongoose.model('product', product);
module.exports.OrderModel = mongoose.model('order', order);