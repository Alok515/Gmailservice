const functions = require('@google-cloud/functions-framework');
const express = require('express');
const cors = require('cors');
const db = require('./config/MongooseConnect');
db();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const urlparse = require('url-parse');
//const queryParser = require('query-string');
/*const {
    Audience,
    IssuerUrl,
    Algorithm
} = process.env;
*/

const app = express();
app.use(cors());

/*const jwtCheck = auth({
    audience: Audience,
    issuerBaseURL: IssuerUrl,
    tokenSigningAlg: Algorithm
});*/

app.use(cookieParser());
app.use(session({secret: 'LONG LONGG LONG SECRET IS THIS SJSKjjsjs'}));


app.use(express.json());
app.use(express.urlencoded({extended: true}));

const route = require('./router/index');
const errorHandle = require('./middleware/errorHandle');
app.get('/', (req, res) => {res.send("hello")});
//app.use(jwtCheck);

app.use(route);
app.use(errorHandle);

functions.http('GmailApi', app);