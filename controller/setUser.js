const Token = require('../schema/token');
const {google} = require('googleapis');
const oauth2Client = require('../config/configoAuth');
const axios = require('axios');
//const getProfile = require('../mailer/getProfile');
const User = require('../schema/user');
/*
const setUser = async (req, res) => {
    try {
        const { emailAddress } = await getProfile();
        const user = await User.findOne({ userMail: emailAddress });
        console.log(user);
        if(!user){
            await User.create({ userMail: emailAddress});
            console.log("New User created");
        }
        const msg = {
            email: emailAddress,
        }
        return res.json(msg);
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}
*/
const setUser = async (req, res) => {
    console.log(req.query)
    console.log(req.query.code);
    const code = req.query.code;
    const tokens = await oauth2Client.getToken(code);
    req.app.locals.token = tokens.tokens.access_token;
    try {
        const responsedata = await axios.get('https://www.googleapis.com/gmail/v1/users/me/profile', {
            headers: {
                'Authorization': 'Bearer ' + tokens.tokens.access_token,
                'Content-Type': 'application/json'
            }
        })
        const userToken = await Token.findOne({
            user: responsedata.data.emailAddress
        });
        if(!userToken) {
            //set refresh token;
            const setToken = await Token.create({
                token: tokens.tokens.refresh_token,
                user: responsedata.data.emailAddress
            });
            if(setToken) console.log('setToken created successfully');
        }
        const user = await User.findOne({
            userMail: responsedata.data.emailAddress
        });
        if(!user) {
            const newUser = await User.create({
                userMail: responsedata.data.emailAddress
            });
            if(newUser) console.log('newUser created successfully');
        }
        
        req.app.locals.user = responsedata.data.emailAddress;
        //console.log(tokens.tokens.access_token);
        //console.log(responsedata.data);
        const d = JSON.stringify(responsedata.data);
        res.json({
            user: req.app.locals.user,
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = setUser;