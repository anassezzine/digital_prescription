//Medicament Model
const mongoose = require('mongoose');


// Schema Definition
const MedicamentSchema = new mongoose.Schema({
    MedicamentName: {type :String, required : true,  unique: true},

});

const Medicament= mongoose.model('Medicament', MedicamentSchema);

module.exports = Medicament;