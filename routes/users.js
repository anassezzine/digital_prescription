const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Patient = require('../models/patient')
const Professionnel = require('../models/professionnel')

//Login
router.post('/auth', (req, res, next) => {
  const identifiant  = req.body.identifiant;
  const password = req.body.password;
  const query = {identifiant}

  if ((req.body.identifiant).toString().length==13)
  {  
    //Check the user exists
    Patient.findOne(query)
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
        const token = jwt.sign({ user }, process.env.PATIENT_SECRET, { expiresIn: ONE_MOUNTH });

        //User Is Valid
        //This object is just used to remove the password from the retuned fields

        let userinfo= {
          nom: user.nom,
          prenom: user.prenom,
          numTel:user.numTel,
          email: user.email,
          identifiant:user.identifiant,
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

  }else if ((req.body.identifiant).toString().length==11){  
    //Check the user exists
    Professionnel.findOne(query)
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
          const token = jwt.sign({ user }, process.env.PROFESSIONNEL_SECRET, { expiresIn: ONE_MOUNTH });
         
          //User Is Valid
          //This object is just used to remove the password from the retuned fields

          let userinfo= {
            nom: user.nom,
            prenom: user.prenom,
            numTel:user.numTel,
            email: user.email,
            identifiant:user.identifiant,
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
  }
});

 

//Registeration
router.post('/register', (req, res, next) => {
 
  if ((req.body.identifiant).toString().length==13){
    let newPatient = new Patient({
        nom: req.body.nom,
        prenom:req.body.prenom,
        email: req.body.email,
        numTel:req.body.numTel,
        identifiant:req.body.identifiant,
        password: req.body.password
    });

    newPatient.save()
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

  }else if((req.body.identifiant).toString().length==11){
    let newPro = new Professionnel({
      nom: req.body.nom,
      prenom:req.body.prenom,
      email: req.body.email,
      numTel:req.body.numTel,
      identifiant:req.body.identifiant,
      password: req.body.password
    });

    newPro.save()

    .then(pro => {
        res.send({
        success: true,
        message: 'User saved',
        pro
        });
    })

    .catch(err => {
        res.send({
        success: false,
        message: 'Failed to save the user'
        });
    });

  }else{
    res.send({
      success: false,
      message: 'Num not valid'
      });
  }
});

//Get user info
router.post('/getpro', (req, res) => {
  const id_pro = req.body.identifiant;
  Professionnel.findOne({ identifiant: id_pro })
  .then((user) => {
    if (!user) {
      return res.send({
        success: false,
        message: 'Error, Account not found',
      });

    } else {
      return res.send({
        success: true,
        user
      });
    }
  });
});

// Modify user info
router.post('/updateUserInfo', (req, res) => {
  const updatedInfo = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    numTel: req.body.numTel
  };

  if ((req.body.identifiant).toString().length==13) {
    Patient.findOneAndUpdate({ identifiant: req.body.identifiant }, updatedInfo, { new: true })
      .then((user) => {
        if (!user) {
          return res.send({
            success: false,
            message: 'Error, Account not found',
          });
        } else {
          res.send({
            success: true,
            message: 'User updated',
            user: user
          });
        }
      })
      .catch(err => {
        res.send({
          success: false,
          message: 'Error, please try again'
        });
      });
  } else if ((req.body.identifiant).toString().length==11) {
    Professionnel.findOneAndUpdate({ identifiant: req.body.identifiant }, updatedInfo, { new: true })
      .then((user) => {
        if (!user) {
          return res.send({
            success: false,
            message: 'Error, Account not found',
          });
        } else {
          res.send({
            success: true,
            message: 'User updated',
            user: user
          });
        }
      })
      .catch(err => {
        res.send({
          success: false,
          message: 'Error, please try again'
        });
      });
  } else {
    res.send({
      success: false,
      message: 'Invalid identifier length'
    });
  }
});


module.exports = router;