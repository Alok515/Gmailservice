const express = require('express');
const v1Route = require('./v1/index');
const route = express.Router();
const setuser = require('../controller/setUser');
const requesturl = require('../controller/acessToken');
route.use('/api', v1Route);

route.get('/login', (req, res) =>{
    const url = requesturl();
    res.redirect(url);
});
route.get('/callback',setuser);
route.get('/test', (req, res) =>{
    console.log(req.session.token);
    res.send("test token");
})

module.exports = route;