const express = require('express');
const passport = require('passport');
//const passport_professionnel = require('passport');
const router = express.Router();
const Ordonnance = require('../models/ordonnance.js');

// Add New Task (Todo) for the passport_pro strategy
router.post('/add', passport.authenticate('professionnel-jwt', { session: false }), (req, res, next) => {

  const medicamentsMap = new Map();
  console.log(req.body.medicaments);
  req.body.medicaments.forEach(medicament => {
    console.log(medicament)
    //const [name, frequency] = Object.entries(medicament)[0];
    //medicamentsMap.set(name, frequency);
  });
  console.log(medicamentsMap);
  const ordonnance = new Ordonnance({
    id_pro: req.body.id_pro,
    id_patient: req.body.id_patient,
    date: new Date().toJSON().slice(0, 10),
    medicaments: medicamentsMap
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
router.get('/list', passport.authenticate('patient-jwt', { session: false }), async (req, res, next) => {
  const owner = req.body.id_patient;
  try {
    const ordonnance = await Ordonnance.find({ owner });
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


//Delete Task
/*router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  return res.send("delete ");
});*/

module.exports = router;
