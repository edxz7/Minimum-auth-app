require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');

const app = express();

//Connect to MongoDB
mongoose
    .connect(process.env.DB, { useNewUrlParser:true, useUnifiedTopology:true})
    .then(x => console.log(`Connected to Mongo data base name: ${x.connections[0].name}`))
    .catch(error => console.log("Error connecting to mongo", error))


//Body parser middlewere
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

//passport middlewere
app.use(passport.initialize())
//passport config
require("./config/passport")(passport)
//Routes
app.use("/api/users", users)

const port = process.env.PORT || 5000;

app.listen(port, ()=>console.log(`Server up and runing on port ${port}!`))
