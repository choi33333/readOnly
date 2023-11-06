const mongoose = require('mongoose');

const user = require('./schemas/user');
const category = require('./schemas/category');
const { productType, product } = require('./schemas/product');
const order = require('./schemas/order');

module.exports.User = mongoose.model('user', user);
module.exports.Category = mongoose.model('category', category);
module.exports.ProductType = mongoose.model('productType', productType);
module.exports.Product = mongoose.model('product', product);
module.exports.Order = mongoose.model('order', order);
