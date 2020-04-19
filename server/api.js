const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  //res.sendFile('../ui/game.html');
  res.sendFile(`${res.app.locals.ui}\\game.html`);
});

router.get('/:id', (req, res, next) => {
  console.log('ID:', req.params.id);
  next();
}, (req, res, next) => {
  res.sendFile(`${res.app.locals.ui}\\game.html`);
});

module.exports = router;