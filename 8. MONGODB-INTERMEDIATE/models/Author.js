const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
    name: String,
    bio: String,

});

module.exports = mongoose.model("Author", AuthorSchema);


//one author can write multiple books
//we r trying to learn rest two cocept for that we first made book and author schema