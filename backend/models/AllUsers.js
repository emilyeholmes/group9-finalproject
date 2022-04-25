const { json } = require("express");
const mongoose = require("mongoose");

const AllUsersSchema = mongoose.Schema({
    AllUsers: {
        type: Array,
        required: true,
    }
});

// export model user with UserSchema
module.exports = mongoose.model("allusers", AllUsersSchema);