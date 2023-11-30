const functions = require('@google-cloud/functions-framework');

const express = require('express');
const cors = require('cors');
const db = require('./config/MongooseConnect');
db();
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const route = require('./router/index');
const errorHandle = require('./middleware/errorHandle');

app.use(route);
app.use(errorHandle);

functions.http('GmailApi', app);