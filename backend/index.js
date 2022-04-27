const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const allusers = require("./routes/allusers");
const InitiateMongoServer = require("./config/db");

require('dotenv').config();

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded());

// PORT
const PORT = process.env.PORT || 4000;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

// Middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ message: "API Working" });
});

app.use("/user", user);

app.use("/allusers", allusers);

app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`);
});