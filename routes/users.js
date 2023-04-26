const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user')


//Login
router.post('/auth', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const query = {email}
  //Check the user exists
    User.findOne(query)
    .then((user) => {
        if (!user) {
            return res.send({
            success: false,
            message: 'Error, Account not found'
            });
        } else {
          //Check if the password is correct
          user.isPasswordMatch(password, user.password, (err, isMatch) => {
          if (!isMatch) {
              return res.send({
              success: false,
              message: 'Error, Invalid Password'
            });
        }
        //User is Valid

        const ONE_MOUNTH = 2592000; //Token validtity in seconds

        //Generating the token
        const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: ONE_MOUNTH });
        
        //User Is Valid
        //This object is just used to remove the password from the retuned fields
        let userinfo= {
          name: user.name,
          email: user.email,
          id:user._id,
          token
        }
        //Send the response back
        return res.send({
          success: true,
          message: 'You can login now',
          user:userinfo
        });
      });
    }
  })
  .catch((err) => {
    reject({
      success: false,
      message: 'Error, please try again'
    });
  });

});


//Registeration
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save()
    .then(user => {
        res.send({
        success: true,
        message: 'User saved',
        user
        });
    })
    .catch(err => {
        res.send({
        success: false,
        message: 'Failed to save the user'
        });
    });
});

module.exports = router;