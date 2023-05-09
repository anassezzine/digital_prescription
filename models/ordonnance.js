//Ordonnance Model
const mongoose = require('mongoose');
const Medicament = require('./listmedicament');


// Schema Definition
const PrescriptionSchema = new mongoose.Schema({
    /*id: {type :Number, required : true,  unique: false},*/
    id_pro: {type :Number, required : true,  unique:false},
    id_patient: {type :Number, required : true,  unique:false},
    date: {type :Date, required : true,  unique: false},
    medicaments: { type: Map, of: String, required: true, unique: false }
});


PrescriptionSchema.pre('save', async function(next) {
  try {
    console.log("save");
    console.log(this.medicaments);
    //console.log(Medicament.schema);
    console.log(this.medicaments.length);

    let a={medicamentName: this.medicaments  };
    console.log(a)
    const medsExist = await Medicament.find({medicamentName: {$in: this.medicaments}});

    console.log(medsExist);
    console.log(medsExist.length);
    
    if (medsExist.length !== this.medicaments.length) {
      console.log("hey");
      throw new Error('One or more medicament IDs do not exist in the Medicament collection');
    }
    next();
  } catch (err) {
    next(err);
  }
});


const Ordonnance= mongoose.model('Ordonnance', PrescriptionSchema);

module.exports = Ordonnance;