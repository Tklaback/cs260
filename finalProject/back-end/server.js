const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const dbConnection = require("./database");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')
const passport = require("./passport");

const app = express();

const clientP = mongoose.connect(
  'mongodb://localhost:27017/simple-mern-passport',
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(m => m.connection.getClient())


app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(session({
  secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    clientPromise: clientP,
    dbName: "simple-mern-passport",
    stringify: false,
    autoRemove: 'interval',
    autoRemoveInterval: 1
  })
}));

app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser

app.use(bodyParser.json());


app.use('/user', user);

app.listen(3000, () => {console.log("listening on port 3000")})