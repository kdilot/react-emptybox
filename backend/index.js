require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3001;
const api = require('api');
const server = express()
  .use(express.static(path.join(__dirname, 'client/build')))
  .use(bodyParser.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded
  .use(bodyParser.json())
  .use('/api', api)
  .use((req, res) => res.sendFile(path.join(__dirname + '/client/build/index.html')))
  .listen(port, () => console.log(`Listening on ${port}`));
const db = require('db');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });
require('crawler/index')(wss);
db.connect();