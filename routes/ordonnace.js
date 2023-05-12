const express = require('express');
const passport = require('passport');
const router = express.Router();
const Ordonnance = require('../models/ordonnance.js');
const{ObjectId} = require('mongodb');

// Add New Task (Todo) for the passport_pro strategy
router.post('/add', passport.authenticate('professionnel-jwt', { session: false }), (req, res, next) => {
  const ordonnance = new Ordonnance({
    id_pro: req.body.id_pro,
    id_patient: req.body.id_patient,
    date: new Date().toJSON().slice(0, 10),
    medicaments:req.body.medicaments
  })
  console.log(ordonnance);
  

  ordonnance.save()
    .then(ordonnance => {
      res.send({
        success: true,
        ordonnance,
        message: 'ordonnance Saved'
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



//Delete Task
/*router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  return res.send("delete ");
});*/

module.exports = router;
