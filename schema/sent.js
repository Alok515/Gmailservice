const mongoose = require('mongoose');

const sentSchema = new mongoose.Schema({
    toMail: {
        type: 'string',
        required: true
    },
    sub: {
        type: 'string',
    },
    msg: {
        type: 'string',
    },
    isdeleted:{
        type: 'boolean',
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

const Send = mongoose.model('Send', sentSchema);

module.exports = Send;