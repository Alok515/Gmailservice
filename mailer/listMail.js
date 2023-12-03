require('dotenv').config();
const configAxios = require('../config/axiosConfig');
const accessToken = require('../controller/acessToken');
const axios = require('axios');
const User = require('../schema/user');
const Mail = require('../schema/mail');

const { Gmail_url } = process.env;

const listMail = async (req, res) => {
    try {
        const userMail = req.app.locals.user;
        const token = req.app.locals.token;
        const url = `${Gmail_url}me/threads?maxResults=100`;
        const user = await User.findOne({userMail:userMail});
        //console.log(user._id);
        const config = configAxios('get', url, token);
        const results = await axios(config);
        console.log(JSON.stringify(results.data));
        const maildata = results.data?.threads?.map(d=> {
            return {
                mailId:d.id,
                msg:d.snippet,
                user:user._id,
            }
        });
        //console.log(maildata);
        maildata.map(mail => {
            Mail.findOne({mailId:mail.mailId})
                .then(d => {
                    console.log(d);
                    if(d === null){
                        Mail.create({
                            mailId:mail.mailId,
                            msg:mail.msg,
                            user: mail.user
                        })
                            .then(()=> console.log( `mail created  ${mail.mailId}`))
                    }
                });
        });
        
        return res.json(results.data);
    } catch (error) {
        if(error.response.status === 401){
            console.log("handle 401 here");
            return res.redirect("/login");
    }
        return res.json({ error: "Some Error Occured", status: error.response.status});
    }
}

module.exports = listMail;