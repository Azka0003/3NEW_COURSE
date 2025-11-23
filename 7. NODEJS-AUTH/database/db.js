const mongoose = require('mongoose');
require('dotenv').config()

const connectToDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI;
        mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (e) {
console.log('MongoDB connection failed!');
process.exit(1)
    } 
}


module.exports=connectToDB;