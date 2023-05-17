const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Medecin = require('../models/medecin');
const Medicament=require('../models/listmedicament');

//Login
router.post('/auth', (req, res, next) => {
  const nom  = req.body.nom;
  const password = req.body.password;

  const query = {nom}
    //Check the user exists
    Admin.findOne(query)
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
          nom: user.nom,
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
  
    let newAdmin = new Admin({
        nom: req.body.nom,
        password: req.body.password
    });
    console.log(newAdmin);

    newAdmin.save()
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
            message: 'Failed to save the user',
            err
        });
    });


});

router.post('/addmedecin', (req, res, next) => {
    /*    nom: {type :String, required : false},
    prenom: {type :String, required : false},
    identifiant: {type :Number, min: 11111111111, max: 99999999999 , required : true, unique: true},  */
    const newmedecin = new Medecin({
        nom: req.body.nom,
        prenom: req.body.prenom,
        identifiant:req.body.identifiant,
    })
    console.log(newmedecin);
  
    newmedecin.save()
      .then(medecin => {
        res.send({
          success: true,
          newmedecin,
          message: 'medecin Saved'
        });
      })
      .catch(err => {
        // throw err;
        res.send({
          success: false,
          message: 'Error while saving, pelase try again',
          err: err
        });
      });
  
});

router.post('/addmedicament', (req, res, next) => {
    const newmedicament = new Medicament({
        medicamentName: req.body.medicamentName,
        //id: req.body.id,
    })
  
    newmedicament.save()
      .then(medicament => {
        res.send({
          success: true,
          medicament,
          message: 'medicament Saved'
        });
      })
      .catch(err => {
        // throw err;
        res.send({
          success: false,
          message: 'Error while saving, pelase try again',
          err: err
        });
      });
  
});

//to do delete medecien 


//to do delete medicamant

module.exports = router;

