//Medicament Model
const mongoose = require('mongoose');
const thh=require('./listmedicament');

// Schema Definition
const MedicinSchema = new mongoose.Schema({
    nom: {type :String, required : false},
    prenom: {type :String, required : false},
    identifiant: {type :Number, min: 11111111111, max: 99999999999 , required : true, unique: true}, 
});

const Medicin= mongoose.model('MedicinSchema', MedicinSchema);

module.exports = Medicin;
