const express = require('express');
const passport = require('passport');
const router = express.Router();
//const Task = require('../models/task.js');

//Add New Task (Todo)
router.post('/add', passport.authenticate('jwt', { session : false}) , (req, res, next) => {
    return res.send ("add");
});

//List Own Tasks
router.get('/list', passport.authenticate('jwt', { session : false}) , (req, res, next) => {
    return res.send ("list");
});

//Delete Task
router.delete('/delete/:id', passport.authenticate('jwt', { session : false}) , (req, res, next) => {
    return res.send ("delete ");
});

module.exports = router;