const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/User");
const auth = require('../middleware/auth');
const { serialize } = require("bson");

router.get("/access", async (req, res) => {
    const users = {};
    for await(const user of User.find()) {
        users[user.username] = {
            email: user.email, 
            bio: user.bio,
            profileurl: user.profileurl,
            emojigoal: user.emojigoal,
            potentialmatches: user.potentialmatches,
            existingmatches: user.existingmatches
        };
    }
    res.json(users);
});

module.exports = router;