
const configAxios = (method, url, token) => {
    return {
        method: method,
        url: url,
        headers: {
            Authorization: `Bearer ${token}`,
            content: 'application/json'
        }
    }
};

module.exports = configAxios;