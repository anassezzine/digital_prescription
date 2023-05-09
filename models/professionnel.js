//professionel Model
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Medicien = require('./medecin');

// Schema Definition
const ProfessionnelSchema = new mongoose.Schema({
  nom: {type :String, required : false},
  prenom: {type :String, required : false},
  email: { type: String, required: true, unique: true },
  numTel: { type: Number,required: true, unique: true},
  identifiant: {type :Number, min: 11111111111, max: 99999999999 , required : true, unique: true}, 
  password: { type: String, required: false }
});

//Pre Save Hook. Used to hash the password
ProfessionnelSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const exist = await Medicien.exists({ nom: this.nom, prenom: this.prenom, identifiant: this.identifiant });
    if (!exist) {
      throw new Error('Medicien not found!');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;

    next();
  } catch (err) {
    next(err);
  }
});

//Custom method to check the password correct when login
ProfessionnelSchema.methods.isPasswordMatch = function(plainPassword, hashed, callback) {
  console.log('boii');
  bcrypt.compare(plainPassword, hashed, (err, isMatch) => {
    console.log(plainPassword,"gg");
    console.log(hashed,"gg");
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
}

const Professionnel = mongoose.model('ProfessionnelSchema', ProfessionnelSchema);

module.exports = Professionnel;