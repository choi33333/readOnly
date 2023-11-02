const mongoose = require('mongoose');
const User = require('./schemas/user');
const Category = require('./schemas/category');

exports.User = mongoose.model('User', User);
exports.Category = mongoose.model('Category', Category);