const express = require('express');
const passport = require('passport');
const router = express.Router();
const Ordonnance = require('../models/ordonnance.js');
const{ObjectId} = require('mongodb');
const Medicament = require('../models/medicament.js');

// Middleware pour parser les données JSON
router.use(express.json());

// Middleware pour parser les données x-www-form-urlencoded
router.use(express.urlencoded({ extended: true }));

// créer et ajouter une nouvelle ordonnance
router.post('/addOrdonnance', (req, res, next) => {
  const ordonnance = new Ordonnance({
    id_pro: req.body.id_pro,
    id_patient: req.body.id_patient,
    medicaments: req.body.medicaments
  });

  console.log(ordonnance);

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
router.post('/getOrdonnance', async (req, res, next) => {
  console.log("getordonnances");
  const _id = req.body._id;
  console.log(_id)
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
    console.log(error);
    return res.send({
      success: false,
      message: 'An error occurred',
    });
  }
});

router.post('/getmedicaments', async (req, res, next) => {
  console.log("getmedicaments");
  const id = req.body.id;
  console.log(id)
  try {
    const medicament = await Medicament.findOne({ _id: new ObjectId(id) });
    
    if (!medicament) {
      return res.send({
        success: false,
        message: 'Error, medicament not found',
      });
    } else {
      return res.send({
        success: true,
        medicament
      });
    }
  } catch (error) {
    console.log(error);
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
