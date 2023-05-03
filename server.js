require('dotenv').config();
const port = process.env.port;
const db = process.env.db;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const path= require('path');
const cors=require('cors');



const app = express();

const UserRoutes= require ("./routes/users")
const TaskRoutes= require ("./routes/tasks");


//Database Connection
mongoose.connect (db) ;

mongoose.connection.on('connected', () => {
    console.log('Connected to the database');
});

mongoose.connection.on('error', (err) => {
    console.log('Unable to connect to the database' + err);
});


app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
require("./config/passport_patient")(passport);
require("./config/passport_professionnel")(passport);

//Static public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', UserRoutes);
app.use('/tasks', TaskRoutes);

//Start the server
app.listen (port, () => {
    console.log('Server started on port ' + port);  
});  