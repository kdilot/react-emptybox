const api = require('express').Router();
const vtc = require('api/vtc');

api.use('/vtc', vtc)

module.exports = api;

