// Ordonnance Model
const mongoose = require('mongoose');

// Schema Definition
const OrdonnanceSchema = new mongoose.Schema({
  id_pro: { type: String, required: true },
  id_patient: { type: String, required: true },
  date: { type: Date, default: Date.now },
  medicaments: [{
    nom: { type: String, required: true },
    duree: { type: String, required: true },
    quantite: {
      matin: { type: Number, required: true },
      midi: { type: Number, required: true },
      soir: { type: Number, required: true }
    }
  }]
});

const Ordonnance = mongoose.model('Ordonnance', OrdonnanceSchema);

module.exports = Ordonnance;


/*PrescriptionSchema.pre('save', async function(next) {
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
});*/
