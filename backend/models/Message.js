const { json } = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");

const MessageSchema = mongoose.Schema({
    messageId: {
        type: String,
        required: true,
    },
    sender: {
        type: User,
        required: true,
    },
    receiver: {
        type: User,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    timestamp: {
        type: String,
        required: true,
    },
    previous: {
        type: String,
        required: true
    },
    unread: {
        type: Boolean,
        default: true,
    }
});

// export model user with UserSchema
module.exports = mongoose.model("message", MessageSchema);