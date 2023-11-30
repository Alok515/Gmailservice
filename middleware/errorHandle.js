const errorHandle = (error, req, res, next) => {
    res.status(error.status || 500).send(`<h1>Error: ${error.status}`);
    
}

module.exports = errorHandle;