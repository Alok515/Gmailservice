const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    token: {
        type: 'string',
        unique: true,
        required: true

    },
    user: {
        type: 'string',
    }
});


const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;