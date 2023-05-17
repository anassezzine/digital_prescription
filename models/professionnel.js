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
ProfessionnelSchema.pre('save', function(next) {
  console.log('Pre Save Hook Called');
     if (!this.isModified('password'))  {
        console.log('Password not modified');
       return next();
     }
    //Generate Salt Value
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      //Use this salt value to hash password
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
        this.password = hash;
        next();
      });
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