const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userMail: {
        type: 'string',
        required: 'true',
        unique: 'true'
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;