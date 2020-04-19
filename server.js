const express = require('express');
const path = require('path');
const http = require('http');
const process = require('process');
const bodyParser = require('body-parser');

const app = express();

// CONFIGURO LAS RUTAS DE MI API
const api = require('./server/api.js');
app.use('/game', api);

// CONFIGURO BODYPARSER PARA QUE PUEDA INTERPRETAR LOS DATOS
// QUE LLEGAN POR HTTP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// PONGO A SERVIR LA RUTA DE MIS ARCHIVOS
app.locals.ui = path.join(__dirname, './ui');
app.use('/build', express.static('build'));
app.use('/img', express.static('client/img'));
app.use('/vendor', express.static('client/vendor'));

// DEVUELVO MI INDEX.HTML CUANDO SE APUNTE A CUALQUIER RUTA
app.get('/', (req, res) => {
  res.sendFile(`${app.locals.ui}\\index.html`);
});

// CONFIGURO EL PUERTO DE MI SERVIDOR
const port = process.env.PORT || '5002';
app.set('port', port);

// CREO EL SERVIDOR
const server = http.createServer(app);

// EL SERVIDOR ESTA ESCUCHANDO PETICIONES
server.listen(port, () => console.log(`La magia pasa en localhost:${port}`));
