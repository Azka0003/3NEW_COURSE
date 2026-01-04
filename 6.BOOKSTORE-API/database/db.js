// const mongoose = require('mongoose')
// require('dotenv').config()

// const connectToDB = async () => {
//     try {
//         const CONNECTING_STR=process.env.CONNECTING_STR;
//         await mongoose.connect(CONNECTING_STR);
//         console.log("mongodb is connected successfully!")
//     } catch (error) {
//         console.error("MongoDb connection failed", error);
//         process.exit(1);
//     }
// }
// module.exports=connectToDB;


const mongoose = require("mongoose");
require('dotenv').config()
let isConnected = false;

const connectToDB = async () => {
  if (isConnected) return;

  try {
  const CONNECTING_STR=process.env.CONNECTING_STR;
        await mongoose.connect(CONNECTING_STR);
            isConnected = true;
        console.log("mongodb is connected successfully!")


  } catch (error) {
    console.error("MongoDb connection failed", error);
        process.exit(1);
  }
};

module.exports = connectToDB;

// This prevents multiple database connections from being opened.
// It improves stability and reliability when running on Vercel.