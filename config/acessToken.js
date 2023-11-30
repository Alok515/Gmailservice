//require('dotenv').config();
const { google } = require('googleapis');

const { C_ID, C_HIDE, REDIRECT, REFRESH_TOKEN } = process.env;

const token = async () => {

    const token = new google.auth.OAuth2(C_ID, C_HIDE, REDIRECT);
    token.setCredentials({
        refresh_token: REFRESH_TOKEN
    });
    const accessToken = await token.getAccessToken();
    console.log("access_token");
    return accessToken;
}

module.exports = token;