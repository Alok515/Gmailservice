//require('dotenv').config();
const mongoose = require('mongoose');

const MongooseConnect = async ()=> {
    const connection = await mongoose.connect(process.env.Mongo_url);
    if(connection){
        console.log('Connected to Mongoose server');
    }
}

module.exports = MongooseConnect;