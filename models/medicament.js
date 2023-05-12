//Medicament Model
const mongoose = require('mongoose');

const MedicamentSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    duree: { type: String, required: true },
    quantite: {
      matin: { type: Number, required: true },
      midi: { type: Number, required: true },
      soir: { type: Number, required: true }
    }
  });

const Medicament= mongoose.model('MedicamentSchema', MedicamentSchema);

module.exports = Medicament;