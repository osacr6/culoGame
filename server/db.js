var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('assmaster.db');

// https://github.com/mapbox/node-sqlite3

/**
 * 
 */
const init = () => {
  console.log(`init: db => ${db}`);
  db.serialize( () => {

    console.log(`CREATE TABLE => Game`);
    db.run(`CREATE TABLE IF NOT EXISTS "Game" (
      "GameID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      "URL" TEXT NOT NULL UNIQUE
    )`);

    console.log(`CREATE TABLE => Session`);
    db.run(`CREATE TABLE IF NOT EXISTS "Session" (
      "SessionID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      "GameID" INTEGER NOT NULL,
      "Matrix" TEXT,
      "Cementery" TEXT,
      "Turn" TEXT,
      "President" TEXT,
      "VicePresident" TEXT,
      "ViceAss" TEXT,
      "Ass" TEXT,
      FOREIGN KEY("GameID") REFERENCES "Game"("GameID")
    )`);

    console.log(`CREATE TABLE => User`);
    db.run(`CREATE TABLE IF NOT EXISTS "User" (
      "UserID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      "token" TEXT NOT NULL UNIQUE,
      "name" TEXT
    )`);
  });

  
}

const close = () => {
  console.log(`db.close`);
  db.close();
}

/**
 * 
 */
const newGame = (url, cb) => {
  console.log(`newGame: url => ${url}`);
  db.run(`INSERT INTO Game ("URL") VALUES (${url})`, (err, row) => {
    console.log({err, row});
    getGame(url, cb);
  });
}

/**
 * 
 */
const getGame = (url, cb) => {
  console.log(`getGame: url => ${url}`);
  db.get(`SELECT * FROM Game where URL = ${url}`, (err, row) => {
    console.log({err, row});
    if (row == null) {
      newGame(url, cb);
    } else {
      cb(err, row);
    }
  });
}

/**
 * 
 */
const newSession = () => {
  db.run(`INSERT INTO Session("GameID", "Matrix") VALUES (1, '[[deck][deck]]')`);
}

module.exports = {init, close, getGame, newSession};


