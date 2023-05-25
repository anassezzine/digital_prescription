// Ordonnance Model
const mongoose = require('mongoose');
const Medicament = require('./listmedicament');
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


OrdonnanceSchema.pre('save', async function(next) {
  try {
    const medicamentNames = this.medicaments.map(medicament => medicament.nom);

    const medsExist = await Medicament.find({ medicamentName: { $in: medicamentNames } });

    if (medsExist.length !== medicamentNames.length) {
      throw new Error('One or more medicament names do not exist in the Medicament collection');
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});


const Ordonnance = mongoose.model('Ordonnance', OrdonnanceSchema);

module.exports = Ordonnance;