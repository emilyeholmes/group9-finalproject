const mongoose = require("mongoose");

// Replace this with your MONGOURI.
const MONGOURI = "mongodb://127.0.0.1:27017/group9";
const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(MONGOURI, {
            useNewUrlParser: true,
        });
        console.log("Connected to database!!");
    } catch (e) {
        console.log(e);
        throw e;
    }
};

module.exports = InitiateMongoServer;