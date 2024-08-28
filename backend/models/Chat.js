const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    chat_type: {
        type: String,
        enum: ['one-on-one', 'group'],
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Chat', chatSchema);
