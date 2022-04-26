const { json } = require("express");
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    profileurl: {
        type: String,
        required: false,
    },
    emojigoal: {
        type: String,
        required: true,
    },
    potentialmatches: {
        type: Array,
        required: false,
    },
    existingmatches: {
        type: Array,
        required: false,
    },
    conversations: {
        type: Array,
        required: false
    }
},
    { 'collection': 'users' });

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);