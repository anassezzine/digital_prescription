//patient Model
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Schema Definition
const AdminSchema = new mongoose.Schema({
  nom: {type :String, required : true},
  password: { type: String, required: true }
});

//Pre Save Hook. Used to hash the password
AdminSchema.pre('save', function(next) {

    if (!this.isModified('password'))  {
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
AdminSchema.methods.isPasswordMatch = function(plainPassword, hashed, callback) {
  bcrypt.compare(plainPassword, hashed, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
}

const Admin = mongoose.model('AdminSchema', AdminSchema);

module.exports = Admin;
