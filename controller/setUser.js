const { request } = require('express');
const getProfile = require('../mailer/getProfile');
const User = require('../schema/user');

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

module.exports = setUser;