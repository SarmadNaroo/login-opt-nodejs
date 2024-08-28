const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chat_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message_content: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    media_url: {
        type: String
    },
    translated_text: {
        type: String
    }
});

module.exports = mongoose.model('Message', messageSchema);
