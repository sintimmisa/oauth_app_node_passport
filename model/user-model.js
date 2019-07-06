const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//User Schema//
const userSchema = new Schema({
    username:String,
    googleId:String,
    email:Array,
    thumbnail:String
});

const User = mongoose.model("user", userSchema);

module.exports = User;
