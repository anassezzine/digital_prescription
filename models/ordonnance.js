//Ordonnance Model
const mongoose = require('mongoose');


// Schema Definition
const PrescriptionSchema = new mongoose.Schema({
    PatientLastName: {type :String, required : true,  unique: false},
    PatientFirstName: {type :String, required : true,  unique:false},
    DrLastName: {type :String, required : true,  unique: false},
    DrFirstName: {type :String, required : true,  unique:false},
    NumeroSecu: {type :Number, required : true, unique: true},
    NumeroRPPS: {type :Number, required : true, unique: true},

});

const Ordonnance= mongoose.model('Ordonnance', PrescriptionSchema);

module.exports = Ordonnance;