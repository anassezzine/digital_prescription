const express = require('express');
const passport = require('passport');
const router = express.Router();
const Ordonnance = require('../models/ordonnance.js');
const{ObjectId} = require('mongodb');

// Middleware pour parser les données JSON
router.use(express.json());

// Middleware pour parser les données x-www-form-urlencoded
router.use(express.urlencoded({ extended: true }));

// créer et ajouter une nouvelle ordonnance
router.post('/addOrdonnance',passport.authenticate('professionnel-jwt', { session: false }), async (req, res, next) => {
  const ordonnance = new Ordonnance({
    id_pro: req.body.id_pro,
    id_patient: req.body.id_patient,
    medicaments: req.body.medicaments
  });


  if (ordonnance.medicaments.length === 0) {
    res.send({
      success: false,
      message: 'La liste de médicaments est vide.'
    });
    return;
  }

  ordonnance.save()
    .then(ordonnance => {
      res.send({
        success: true,
        ordonnance,
        message: 'Ordonnance enregistrée avec succès.'
      });
    })
    .catch(err => {
      res.send({
        success: false,
        message: 'Erreur lors de l enregistrement de l ordonnance. Veuillez réessayer.',
        err: err
      });
    });
});


// List Own Tasks for the second passport_patient strategy
router.post('/getAllOrdonnances', passport.authenticate('patient-jwt', { session: false }), async (req, res, next) => {
  
  const id_patient = req.body.id_patient;
  try {
    const ordonnance = await Ordonnance.find({ id_patient });
    return res.send({
      success: true,
      ordonnance
    });
  } catch (err) {
    return res.send({
      success: false,
      message: 'Error while retrieving the ordonnances'
    });
  }
});

//récupérer une ordonnance
router.post('/getOrdonnance', passport.authenticate('patient-jwt', { session: false }), async (req, res, next)  => {
  const _id = req.body._id;
  try {
    const ordonnance = await Ordonnance.findOne({ _id: new ObjectId(_id) });
    
    if (!ordonnance) {
      return res.send({
        success: false,
        message: 'Error, ordonnance not found',
      });
    } else {
      return res.send({
        success: true,
        ordonnance
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: 'An error occurred',
    });
  }
});

//envoyer un mail de notification
router.post('/sendMail', async (req, res, next)  => {
  const email = req.body.email;
  const message = req.body.message;
  const mailData = {
    email: req.body.email,
    message: req.body.message
  };

  try {
    return res.send({
      success: true,
      mailData: mailData
    });
  } catch (error) {
    return res.send({
      success: false,
      message: 'An error occurred',
    });
  }
});



//Delete Task
/*router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  return res.send("delete ");
});*/

module.exports = router;
