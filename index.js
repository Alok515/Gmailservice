const functions = require('@google-cloud/functions-framework');
const { auth } =  require('express-oauth2-jwt-bearer');
const express = require('express');
const cors = require('cors');
const db = require('./config/MongooseConnect');
db();

const {
    Audience,
    IssuerUrl,
    Algorithm
} = process.env;


const app = express();
app.use(cors());

const jwtCheck = auth({
    audience: Audience,
    issuerBaseURL: IssuerUrl,
    tokenSigningAlg: Algorithm
});


app.use(express.json());
app.use(express.urlencoded({extended: true}));

const route = require('./router/index');
const errorHandle = require('./middleware/errorHandle');

app.use(jwtCheck);
app.use(route);
app.use(errorHandle);

functions.http('GmailApi', app);