const mongoose = require('mongoose');

const comment = mongoose.Schema({
    photoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'photo'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    commenter: {
        type: String,
    },
    commentBody: {
        type: String
    },
    likes: {
        type: Array,
        default: []
    }
})
module.exports = mongoose.model('comment', comment)