const mongoose = require('mongoose');

const user = mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 5,
        max: 20,
        unique: true
    },
    password: {
        type: String,
        min: 6
    },
    fullName: {
        type: String
    },

    eMail: {
        type: String,
        unique: true,
        require: true,

    },
    phoneNo: {
        type: String,
        default: ""
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userProfile"
    }],

    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userProfile"
    }],

    userImage: {
        type: String
    },

});

module.exports = mongoose.model("userProfile", user);
