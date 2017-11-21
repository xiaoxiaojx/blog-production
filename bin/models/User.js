"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    nickname: String,
    userName: String,
    password: String,
    email: String,
    avatar: String
});
var User = mongoose.model("User", userSchema);
exports["default"] = User;
