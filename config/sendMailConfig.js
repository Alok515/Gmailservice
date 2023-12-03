require('dotenv').config();
const nodeMailer = require('nodemailer');
const getAccessToken = require('../controller/acessToken');
const Token = require('../schema/token');

const { C_ID, C_HIDE, REFRESH_TOKEN } = process.env;

const sendMailConfig = async(toMail, data, accessToken, userMail)=>{
    try {
    const refreshToken = await Token.findOne({
        user: userMail
    }).token;
    const transport = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAUTH2',
            user: userMail,
            clientId: C_ID,
            clientSecret: C_HIDE,
            refreshToken: refreshToken,
            accessToken: accessToken
        }
    });

    const mailOptions = {
        from: 'Alok',
        to: toMail || 'www.mr.alok@gmail.com',
        subject:data.subject || 'Hello from Node',
        text:data.text||"Hello from Node and nodemailer",
        
    }
    const result = await transport.sendMail(mailOptions);
    console.log(JSON.stringify(result));
    return result;
    } catch (error) {
        console.error(error.message);
        return error;
    }
}

module.exports = sendMailConfig;