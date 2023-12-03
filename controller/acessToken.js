const oauth2Client = require('../config/configoAuth');

const requesturl = () => {
    /*token.setCredentials({
        refresh_token: REFRESH_TOKEN
    });
    const accessToken = await token.getAccessToken();
    console.log("access_token");
    return accessToken;*/

    const scopes = [
        'https://mail.google.com/'
    ]

    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        /*state: JSON.stringify({
            callbackUrl: req.body.callbackUrl,
            userId: req.body.userId
        })*/
    });

    /*request(url, (err, response, body) => {
        console.log("error", err);
        console.log("status: ", response && response.statusCode);
        res.send({url});
    })*/
    console.log(url);
    return url;
}

module.exports = requesturl;