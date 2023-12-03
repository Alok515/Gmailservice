const Token = require('../schema/token');
const oauth2Client = require('./configoAuth');

const genrateToken =async () => {
    const user = req.app.locals.user;
    try {
        const refreshToken =await Token.findOne({
            user: user
        }).token;
        oauth2Client.setCredentials(refreshToken);
        const token = await oauth2Client.getAccessToken();
        return token;
    } catch (error) {
        console.error(error);
    }

}

module.exports = genrateToken;