const mongoose = require('mongoose')
require('dotenv').config()

const connectToDB = async () => {
    try {
        const CONNECTING_STR=process.env.CONNECTING_STR;
        await mongoose.connect(CONNECTING_STR);
        console.log("mongodb is connected successfully!")
    } catch (error) {
        console.error("MongoDb connection failed", error);
        process.exit(1);
    }
}
module.exports=connectToDB;