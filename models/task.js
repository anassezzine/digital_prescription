//Task Model
const mongoose = require('mongoose');


// Schema Definition
const TAskSchema = new mongoose.Schema({
    name: {type :String, required : true,  unique: true},
    done: { type: Boolean },
    owner: { type: String, required: true }
});

const Task= mongoose.model('Task', TAskSchema);

module.exports = Task;