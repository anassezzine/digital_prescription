//Medicament Model
const mongoose = require('mongoose');


// Schema Definition
const MedicamentlistSchema = new mongoose.Schema({
    medicamentName: {type :String, required : true,  unique: true},
    //id: {type :Number, required : true,  unique: true},
});

const Medicamentlist = mongoose.model('Medicamentlist', MedicamentlistSchema);
module.exports = Medicamentlist;