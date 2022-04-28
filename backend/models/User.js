const { json } = require("express");
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
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
    goal: {
        type: String,
        required: true,
    },
    aboutme1: {
        type: String,
        required: true,
    },
    aboutme2: {
        type: String,
        required: true,
    },
    aboutme3: {
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
        default: [],
        required: false
    }
},
    { 'collection': 'users' });

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);


// var config2 = {
    //   method: 'get',
    //   url: 'http://localhost:4000/user/showmessage',
    //   headers: {
    //     'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2OGMyOWYzNGQ5MTEzOTFiNmUzOTMwIn0sImlhdCI6MTY1MTAzMjczNSwiZXhwIjoxNjUxMDQyNzM1fQ.mXoG-q616k47gWen0DY1HNkvpX-DLHkJVnIXOAj28oM'
    //   },
    //   data: data
    // };

    // let counter = 10;
    // console.log(tempMessages);
    // let message = conversations[0];
    // while (message != null && counter > 0) {
    //   tempMessages.push(message);
    //   axios(config2)
    //     .then(function (response) {
    //       message = response.data;
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // }