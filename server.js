require('dotenv').config();
const port = process.env.port;
const db = process.env.db;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
//const passport_professionnel = require('passport');
const session = require('express-session');
const path= require('path');
const cors=require('cors');

const app = express();

const UserRoutes= require ("./routes/users")
const TaskRoutes= require ("./routes/ordonnace");
const AdminRoutes= require ("./routes/admin");

//Database Connection
mongoose.connect (db) ;

mongoose.connection.on('connected', () => {
    console.log('Connected to the database');
});

mongoose.connection.on('error', (err) => {
    console.log('Unable to connect to the database' + err);
});

app.use(session({
    secret: [process.env.PATIENT_SECRET,process.env.USER_SECRET, process.env.PROFESSIONNEL_SECRET],
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Initialize the first passport instance

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport_patient")(passport);


app.use(cors());

//Static public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', UserRoutes);
app.use('/ordonnance', TaskRoutes);
app.use('/admin', AdminRoutes);


//Start the server
app.listen (port, () => {
    console.log('Server started on port ' + port);  
});