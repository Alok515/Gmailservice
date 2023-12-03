require('dotenv').config();
const configAxios = require('../config/axiosConfig');
const accessToken = require('../controller/acessToken');
const axios = require('axios');

const { Gmail_url, Gmail } = process.env;

const getProfile = async () => {
    try {
        const { token } = await accessToken();
        const url = `${Gmail_url}${Gmail}/profile`;
        const config = configAxios('get', url, token);
        const results = await axios(config);
        console.log(JSON.stringify(results.data));
        return results.data
    } catch (error) {
        return error.message;
    }
}

module.exports = getProfile;