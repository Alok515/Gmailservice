const errorHandle = (error, req, res, next) => {
    if(errorHandle.status === 401){
        return res.redirect('/login');
    }
    res.status(error.status || 500).send(`<h1>Error: ${error.status}`);
    
}

module.exports = errorHandle;