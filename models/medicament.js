//Medicament Model
const mongoose = require('mongoose');


// Schema Definition
const MedicamentSchema = new mongoose.Schema({
    MedicamentName: {type :String, required : true,  unique: true},
    id: {type :Number, required : true,  unique: true},
    ordonnanceid: {type :Number, required : true,  unique: true},
    posologie: {type :String, required : true,  unique: false},
});

const Medicament= mongoose.model('MedicamentSchema', MedicamentSchema);

module.exports = Medicament;