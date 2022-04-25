const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/User");
const auth = require('../middleware/auth');

router.get("/access", auth, async (req, res) => {
    // try {
    // request.user is getting fetched from Middleware after token authentication
    // const db = client.db("group9");
    // db.collection('users')
    //     .find({})
    //     .toArray(function (err, result) {
    //         if (err) {
    //             res.status(400).send("Error fetching listings!");
    //         } else {
    //             res.json(result);
    //         }
    //     });
    // const dbName = "group9";
    // client
    //     .connect()
    //     .then(
    //         client =>
    //             client
    //                 .db(dbName)
    //                 .listCollections()
    //                 .toArray() // Returns a promise that will resolve to the list of the collections
    //     )
    //     .then(cols => res.send(cols))
    // .finally(() => client.close());
    // } catch (e) {
    //     res.send({ message: "Error in Fetching all users" });
});

module.exports = router;