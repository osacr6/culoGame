var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('assmaster.db');

// https://github.com/mapbox/node-sqlite3

/**
 * 
 */
const init = () => {
  console.log(`init: db => ${db}`);
  db.serialize( () => {

    console.log(`CREATE TABLE => User`);
    db.run(`CREATE TABLE IF NOT EXISTS "User" (
      "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      "Token" TEXT NOT NULL UNIQUE,
      "Name" TEXT
    )`);

    console.log(`CREATE TABLE => Game`);
    db.run(`CREATE TABLE IF NOT EXISTS "Game" (
      "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      "Name" TEXT,
      "URL" TEXT NOT NULL UNIQUE
    )`);

    console.log(`CREATE TABLE => Session`);
    db.run(`CREATE TABLE IF NOT EXISTS "Session" (
      "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      "GameID" INTEGER NOT NULL,
      "Matriz" TEXT NOT NULL,
      "President" INTEGER,
      "VicePresident" INTEGER,
      "ViceAss" INTEGER,
      "Ass" INTEGER,
      FOREIGN KEY("GameID") REFERENCES "Game"("ID"),
      FOREIGN KEY("President") REFERENCES "User"("ID"),
      FOREIGN KEY("VicePresident") REFERENCES "User"("ID"),
      FOREIGN KEY("ViceAss") REFERENCES "User"("ID"),
      FOREIGN KEY("Ass") REFERENCES "User"("ID")
    )`);

    console.log(`CREATE TABLE => UserGame`);
    db.run(`CREATE TABLE IF NOT EXISTS "UserGame" (
      "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      "GameID" INTEGER NOT NULL,
      "UserID" INTEGER NOT NULL,
      FOREIGN KEY("GameID") REFERENCES "Game"("ID"),
      FOREIGN KEY("UserID") REFERENCES "User"("ID")
    )`);

    console.log(`CREATE TABLE => UserSession`);
    db.run(`CREATE TABLE IF NOT EXISTS "UserSession" (
      "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      "SessionID" INTEGER NOT NULL,
      "UserID" INTEGER NOT NULL,
      FOREIGN KEY("SessionID") REFERENCES "Session"("ID"),
      FOREIGN KEY("UserID") REFERENCES "User"("ID")
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
const newUser = (req, token, cb) => {
  console.log(req.headers);
  console.log(`newUser: VALUES ('${token}', '${req.headers.user}')`);
  //db.run(`INSERT INTO User ('Token', 'Name') VALUES ('${token}', '${req.headers.user}')`, (err, row) => {
  //console.log({err, row});
  //});
}

/**
 * 
 */
const newGame = (url, cb) => {
  console.log(`newGame: VALUES (${url})`);
  db.run(`INSERT INTO Game ('URL') VALUES ('${url}')`, (err, row) => {
    console.log({err, row});
    getGame(url, cb);
  });
}

/**
 * 
 */
const newSession = (req, game, cb) => {
  console.log(`newSession:  VALUES (${game.ID}, '${req.headers.data}')`);
  db.run(`INSERT INTO Session('ID', 'Matriz') VALUES (${game.ID}, '${req.headers.data}')`, (err, row) => {
    console.log({err, row});
    getSession(req, game, cb);
  });
}

/**
 * 
 */
const getUser = (req, token, cb) => {
  console.log(req.headers);
  console.log(`getUser: where Token = ${token}`);
  db.all(`SELECT * FROM User where Token = ${token}`, (err, rows) => {
    console.log({err, rows});
    if (rows.length == 0) {
      //req.headers.data != null ? newUser(req, token, cb) : cb(err, rows)
      cb(err, rows)
    } else {
      cb(err, rows)
    }
  })
}

/**
 * 
 */
const getGame = (url, cb) => {
  console.log(`getGame: where URL = ${url}`);
  db.get(`SELECT * FROM Game where URL = '${url}'`, (err, row) => {
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
const getSession = (req, game, cb) => {
  console.log(`getSession: where ID = ${game.ID}`);
  db.all(`SELECT * FROM Session where ID = ${game.ID} LIMIT 0, 10`, (err, rows) => {
    console.log({err, rows});
    if (rows.length == 0) {
      req.headers.data != null ? newSession(req, game, cb) : cb(err, rows)
    } else {
      cb(err, rows)
    }
  })
}

module.exports = {init, getGame, getSession, getUser};