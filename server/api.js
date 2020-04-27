const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.get('/', (req, res) => {
  res.sendFile(`${res.app.locals.ui}/\game.html`);
});

router.get('/:id', (req, res, next) => {
  db.getGame(req.params.id, (err, data) => {
    console.log({err, data});
    next();
  });
}, (req, res, next) => {
  res.sendFile(`${res.app.locals.ui}/\game.html`);
});

router.get('/db/init', (req, res, next) => {
  console.log('/db/init');
  db.init();
  next();
}, (req, res, next) => {
  res.sendFile(`${res.app.locals.ui}/\game.html`);
});

module.exports = router;