const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Author'
    }
});
//book name,id need to pass as input
module.exports = mongoose.model("Book", BookSchema);