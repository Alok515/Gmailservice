require('dotenv').config();
const configAxios = require('../config/axiosConfig');
const accessToken = require('../config/acessToken');
const axios = require('axios');
const Mail = require('../schema/mail');

const { Gmail_url, Gmail } = process.env;

const readMail = async (req, res) => {
    try {
        const { token } = await accessToken();
        const url = `${Gmail_url}${Gmail}/messages/${req.params.id}`;
        const config = configAxios('DELETE', url, token);
        const results = await axios(config);
        cosole.log(JSON.stringify(results.data));
        const deletedata = await Mail.findOneAndUpdate({
            mailId: req.params.id,
        }, {
            isDeleted: true,
        })
        return res.json({
            "Message": "Message deleted",
            "MessagesId": req.params.id
        });
    } catch (error) {
        return res.json({ error: error });
    }
}

module.exports = readMail;