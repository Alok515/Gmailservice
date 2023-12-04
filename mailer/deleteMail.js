//require('dotenv').config();
const configAxios = require('../config/axiosConfig');
const accessToken = require('../controller/acessToken');
const axios = require('axios');
const Mail = require('../schema/mail');

const { Gmail_url, Gmail } = process.env;

const readMail = async (req, res) => {
    try {
        const token = req.session.token; 
        const url = `${Gmail_url}me/messages/${req.params.id}`;
        const config = configAxios('DELETE', url, token);
        const results = await axios(config);
        //console.log(JSON.stringify(results.data));
        const deletedata = await Mail.findOneAndUpdate({
            mailId: req.params.id,
        }, {
            isDeleted: true,
        });
        if(deletedata)console.log("Mail marked as delete in db");
        else console.log("unable to mark delete in db");
        return res.json({
            "Message": "Message deleted",
            "MessagesId": req.params.id
        });
    } catch (error) {
        if(error.response.status === 401){
            console.log("handle 401 here");
            return res.redirect("/login");
    }
        return res.json({ error: error });
    }
}

module.exports = readMail;