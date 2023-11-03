const mongoose = require('mongoose');
const User = require('./schemas/user');
const Category = require('./schemas/category');
const Product = require('./schemas/product');
const Order = require('./schemas/order');

exports.User = mongoose.model('User', User);
exports.Category = mongoose.model('Category', Category);
exports.Product = mongoose.model('Product', Product);
exports.Order = mongoose.model('Order', Order);
