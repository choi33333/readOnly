const mongoose = require('mongoose');
const User = require('./schemas/user');


exports.User = mongoose.model('User', User);