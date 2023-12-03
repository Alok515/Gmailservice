require('dotenv').config();
const sendMailConfig = require('../config/sendMailConfig');
const User = require('../schema/user');
const Sent = require('../schema/sent');


const sendMailData  = async (req, res) => {
    try {
        const mail = req.body.mail;
        const data = {
            subject: req.body.sub || "This is mail from Nodejs",
            text: req.body.msg || "Hello from Node",
        }

        const user = await User.findOne({usermail:req.app.locals.user});
        const acessToken = req.app.locals.token;
        const result = await sendMailConfig(mail,data, acessToken, user);
        const dbData = await Sent.create({
            toMail: mail,
            sub: data.subject,
            msg: data.text,
            user: user._id
        });
        if(dbData){
            console.log("data Saved in Db");
        }
        res.json({
            msg: result
        });
    } catch (error) {
        if(error.response.status === 401){
            console.log("handle 401 here");
            return res.redirect("/login");
    }
        console.error(error.message);
    }
}

module.exports = sendMailData;