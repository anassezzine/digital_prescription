//professionel Model
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Medicien = require('./medecin');
const { query } = require('express');

// Schema Definition
const ProfessionnelSchema = new mongoose.Schema({
  nom: {type :String, required : false},
  prenom: {type :String, required : false},
  email: { type: String, required: true, unique: true },
  numTel: { type: Number,required: true, unique: true},
  identifiant: {type :Number, min: 10000000000, max: 99999999999 , required : true, unique: true}, 
  password: { type: String, required: false }
});

ProfessionnelSchema.pre('save', function(next) {

  const query={ nom: this.nom, prenom: this.prenom, identifiant: this.identifiant }
  // Check if Medicien exists with the same nom, prenom, and identifiant
  Medicien.findOne(query)
  .then((medicien)=>{
    console.log(medicien)
    if (!medicien) {
      // Medicien not found, do not save the professionnel
      return next(new Error('Medicien not found'));
    }

    if (!this.isModified('password')) {

      return next();
    }

    // Generate Salt Value
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }

      // Use this salt value to hash password
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }

        this.password = hash;
        console.log(this.password)
        next();
      });
    });
  })
  .catch((err)=>{
    return next(new Error('Medicien not found'));
  });
});


//Custom method to check the password correct when login
ProfessionnelSchema.methods.isPasswordMatch = function(plainPassword, hashed, callback) {
  bcrypt.compare(plainPassword, hashed, (err, isMatch) => {

    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
}

const Professionnel = mongoose.model('ProfessionnelSchema', ProfessionnelSchema);

module.exports = Professionnel;