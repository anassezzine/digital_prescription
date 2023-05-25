//Medicament Model
const mongoose = require('mongoose');

// Schema Definition
const MedicinSchema = new mongoose.Schema({
    nom: {type :String, required : false},
    prenom: {type :String, required : false},
    identifiant: {type :Number, min: 10000000000, max: 99999999999 , required : true, unique: true}, 
});

const Medicin= mongoose.model('MedicinSchema', MedicinSchema);

module.exports = Medicin;
