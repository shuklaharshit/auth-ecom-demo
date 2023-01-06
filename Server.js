const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const User = require("./Model/User")
const app = express();
const users = require('./routes/api/users');
const ecom = require('./routes/api/ecom');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    //Checking MongoDB If Connected ? or Not
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

//Passport Middleware
app.use(passport.initialize());

//use Routes
app.use("/api/users", users);

app.use("/api/ecom", ecom);


//passpprt config
require("./config/passport")(passport);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server Running on Port ${port}`));