const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.get('/', (req, res) => {
  res.sendFile(`${app.locals.ui}/\index.html`);
});

router.get('/game', (req, res) => {
  res.sendFile(`${app.locals.ui}/\index.html`);
});

router.get('/game/:id', (req, res, next) => {
  db.getGame(req.params.id, (err, d) => {
    db.getSession(req, d, (err, t) => {
      console.log({err, t});
      next();
    });
  });
}, (req, res, next) => {
  res.sendFile(`${res.app.locals.ui}/\game.html`);
});

router.get('/user', (req, res) => {
  res.sendFile(`${app.locals.ui}/\index.html`);
});

router.get('/user/:token', (req, res, next) => {
  db.getUser(req, (err, t) => {
    console.log({err, t});
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