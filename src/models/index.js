const mongoose = require('mongoose');

const user = require('./schemas/user');
const category = require('./schemas/category');
const {productType, product} = require('./schemas/product');
const order = require('./schemas/order');

module.exports.user = mongoose.model('user', user);
module.exports.category = mongoose.model('category', category);
module.exports.productType = mongoose.model('productType', productType);
module.exports.product = mongoose.model('product', product);
module.exports.order = mongoose.model('order', order);
