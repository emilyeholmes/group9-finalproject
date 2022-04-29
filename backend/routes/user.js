const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const ObjectID = require('mongodb').ObjectID;
const User = require("../models/User");
const Message = require("../models/Message");
const auth = require('../middleware/auth');

const mongoose = require("mongoose");
const { ResultWithContext } = require("express-validator/src/chain");
const { ObjectId } = require("mongodb");

const db = mongoose.connection;
const url = "mongodb://127.0.0.1:27017/demo9";

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
    "/signup",
    [
        check("username", "Please Enter a Valid Username").not().isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6,
        }),
        check("bio", "please enter bio").not().isEmpty(),
        check("emojigoal", "please add goal").not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        const { username, age, email, password, bio, goal, aboutme1, aboutme2, aboutme3, profileurl, emojigoal } = req.body;
        const conversations = [];
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
                age,
                email,
                password,
                bio,
                goal,
                aboutme1,
                aboutme2,
                aboutme3,
                profileurl,
                emojigoal,
                conversations
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
                // {
                //     expiresIn: 10000000,
                // },
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

router.post(
    "/login",
    [
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({
                email
            });
            if (!user)
                return res.status(400).json({
                    message: "User Not Exist"
                });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({
                    message: "Incorrect Password !"
                });

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "randomString",
                {
                    expiresIn: 3600
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: "Server Error"
            });
        }
    }
);

/**
 * @method - GET
 * @description - Get User info
 * @param - /user/profile
 */


//I think we should take away the auth part since it's a social media and we want to be able to view each other's accounts.
router.get("/profile", auth, async (req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (e) {
        res.send({ message: "Error in Fetching user" });
    }
});

router.post("/potentialmatches", auth, async (req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        const user = await User.findById(req.user.id);
        db.collection('users').updateOne(
            { username: user.username },
            {
                $push: { potentialmatches: req.body.otherusername },
                $currentDate: { lastUpdate: true }
            })
        res.send("Success");
    } catch (e) {
        res.send({ message: "Error in Fetching matches" });
    }
});
//this causes an "Error in fetching matches"... not entirely sure why... 

router.post("/existingmatches", auth, async (req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        const user = await User.findById(req.user.id);
        db.collection('users').updateOne(
            { username: user.username },
            {
                $push: { matches: req.body.otherusername },
                $currentDate: { lastUpdate: true }
            })
        res.send("Success");
    } catch (e) {
        res.send({ message: "Error in Fetching matches" });
    }
});

router.post("/changebio", auth, async (req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        const user = await User.findById(req.user.id);
        db.collection('users').updateOne(
            { username: user.username },
            {
                $set: { bio: req.body.newbio },
                $currentDate: { lastUpdate: true }
            })
        // user.bio = req.body.newbio;
        res.send("success");
    } catch (e) {
        res.send({ message: "Error in changing bio" });
    }
});

router.post("/profilepic", auth, async (req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        const user = await User.findById(req.user.id);
        db.collection('users').updateOne(
            { username: user.username },
            {
                $set: { profileurl: req.body.url },
                $currentDate: { lastUpdate: true }
            })
        // user.bio = req.body.newbio;
        res.send("success");
    } catch (e) {
        res.send({ message: "Error in changing bio" });
    }
});

router.post("/sendmessage", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const otheruser = await User.findOne({ username: req.body.otherusername });
        let ourtimestamp = new Date().getTime();
        let lastmess = null;

        // Iterate backwards throu
        for (let i = 0; i < user.conversations.length; i++) {
            if ((user.conversations[i].receiver === user.username &&
                user.conversations[i].sender === otheruser.username) ||
                (user.conversations[i].receiver === otheruser.username &&
                    user.conversations[i].sender === user.username)) {
                lastmess = user.conversations[i];
                break;
            }
        }

        console.log(req.body.text, user.username, otheruser.username);

        message = new Message({
            sender: user.username,
            receiver: otheruser.username,
            body: req.body.text,
            timestamp: String(ourtimestamp),
            previous: lastmess != null ? lastmess._id : null,
            unread: true
        });

        await message.save();

        if (lastmess == null) {
            db.collection('users').updateOne(
                { username: otheruser.username },
                {
                    $push: { conversations: message },
                    $currentDate: { lastUpdate: true }
                });
            db.collection('users').updateOne(
                { username: user.username },
                {
                    $push: { conversations: message },
                    $currentDate: { lastUpdate: true }
                });
        } else {
            db.collection('users').updateOne(
                { username: otheruser.username },
                {
                    $pull: { conversations: { _id: ObjectId(lastmess._id) } },
                    $currentDate: { lastUpdate: true }
                });
            db.collection('users').updateOne(
                { username: otheruser.username },
                {
                    $push: { conversations: message },
                    $currentDate: { lastUpdate: true }
                });
            db.collection('users').updateOne(
                { username: user.username },
                {
                    $pull: { conversations: { _id: ObjectId(lastmess._id) } },
                    $currentDate: { lastUpdate: true }
                });
            db.collection('users').updateOne(
                { username: user.username },
                {
                    $push: { conversations: message },
                    $currentDate: { lastUpdate: true }
                });
        }
        res.json(message);
    } catch (e) {
        console.log(e);
        res.send({ message: "Error in sending message." + e });
    }
});

router.get("/showmessage", auth, async (req, res) => {
    try {
        let message = await Message.findById(ObjectId(req.query.id));
        let user = await User.findById(req.user.id);
        if (message == null) {
            return res.status(400).json({
                message: "Message Not Exist"
            });
        }

        // if (user.username === message.receiver) {
        //     db.collection('messages').updateOne(
        //         { _id: ObjectId(req.body.id) },
        //         { $set: { unread: true },
        //           $currentDate: { lastUpdate: true } });
        //     message = await Message.findById(req.params.id);
        // }
        res.json(message);
    } catch (e) {
        res.send({ message: "Error in getting message." + e });
    }
});

//figure out how profiles are chosen to display
//change bio
//get random profile ?????

module.exports = router;