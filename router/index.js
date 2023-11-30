const express = require('express');
const v1Route = require('./v1/index');
const route = express.Router();
const setuser = require('../controller/setUser');

route.use('/api', v1Route);

route.get('/', setuser);

module.exports = route;