require('dotenv').config();
const { google } = require('googleapis');

const { C_ID, C_HIDE, Redirect, REFRESH_TOKEN } = process.env;

const oauth2Client = new google.auth.OAuth2(C_ID, C_HIDE, Redirect);

module.exports = oauth2Client;