const mongoose = require('mongoose');

const mailSchema = new mongoose.Schema({
    mailId: {
        type: 'string',
        required: true,
        unique: true
    },
    msg: {
        type: 'string',
    },
    isDeleted: {
        type: 'boolean',
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});


const Mail = mongoose.model('Mail', mailSchema);

module.exports = Mail;