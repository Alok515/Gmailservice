//require('dotenv').config();
const configAxios = require('../config/axiosConfig');
const accessToken = require('../config/acessToken');
const axios = require('axios');

const { Gmail_url, Gmail } = process.env;

const readMail = async (req, res) => {
    try {
        const { token } = await accessToken();
        const url = `${Gmail_url}${Gmail}/messages/${req.params.id}`;
        const config = configAxios('get', url, token);
        const results = await axios(config);
        const mail = results.data;
        const sub = mail.snippet;
        console.log(JSON.stringify(mail));
        const message = mail.payload.parts.map(d => {
            const buf = Buffer.from(d.body.data, 'base64');
            const text = buf.toString("ascii");
            return text;
        });
        return res.json({
            mailId: mail.id,
            subject: sub,
            message: message
        });
    } catch (error) {
        return res.json({ error: error });
    }
}

module.exports = readMail;