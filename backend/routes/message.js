const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/User");
const auth = require('../middleware/auth');

const mongoose = require("mongoose");
const db = mongoose.connection;
const url = "mongodb://127.0.0.1:27017/group9final";
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })


router.post(
    "/sendmessage",
    [
        check("body", "Please enter a message").not().isEmpty(),
        //     check("email", "Please enter a valid email").isEmail(),
        //     check("password", "Please enter a valid password").isLength({
        //         min: 6,
        //     }),
        //     check("bio", "please enter bio").not().isEmpty(),
        //     check("emojigoal", "please add goal").not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        const { username, email, password, bio, emojigoal } = req.body;
        try {
            let user = await User.findOne({
                email,
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists",
                });
            }

            user = new User({
                username,
                email,
                password,
                bio,
                emojigoal
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                "randomString",
                {
                    expiresIn: 10000,
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token,
                    });
                }
            );

        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);