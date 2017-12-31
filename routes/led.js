const express = require('express');
const router = express.Router();
const cylonRobot = require('../models/cylon_robot.js');

cylonRobot.start();

router.get('/', (req, res, next) => {
  next(new Error('NotImpemented'));
})
.get('/toogle', (req, res, next) => {
  new Promise(cylonRobot.toogleLed)
  .then(() => res.json({ success: true, message: 'led toogled' }))
  .catch((err) => res.json({ success: false, error: err.message }));
});

module.exports = router;
