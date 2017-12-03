"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var articleSchema = new mongoose.Schema({
    nickname: String,
    userName: String,
    avatar: String,
    title: String,
    content: String,
    like: Array,
    comment: Array,
    date: String,
    editor: String,
    views: Number
});
var Article = mongoose.model("Article", articleSchema);
exports["default"] = Article;
