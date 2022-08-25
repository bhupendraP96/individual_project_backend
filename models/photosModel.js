const mongoose = require('mongoose');

const photo = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    owner: {
        type: String,
    },
    title: {
        type: String,
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    category: {
        type: String
    },
    likes: {
        type: Array,
        default: []
    },
    imageName: {
        type: String
    },
    uploaded: {
        type: String
    }
});
module.exports = mongoose.model('photoData', photo);