"use strict";
exports.__esModule = true;
var User_1 = require("../models/User");
var $findNot = { "_id": 0, "__v": 0 };
exports.register = function (req, res) {
    var _a = req.body, userName = _a.userName, nickname = _a.nickname, password = _a.password;
    User_1["default"].findOne({ userName: userName }, function (err, existingUser) {
        if (err)
            throw err;
        if (existingUser) {
            res.send({
                message: "该用户已存在",
                error: true
            });
        }
        else {
            User_1["default"].insertMany({ userName: userName, nickname: nickname, password: password }, function (err, doc) {
                res.send({
                    message: "注册成功",
                    error: false
                });
            });
        }
    });
};
exports.login = function (req, res) {
    var _a = req.body, userName = _a.userName, password = _a.password;
    User_1["default"].findOne({ userName: userName, password: password }, function (err, existingUser) {
        if (err)
            throw err;
        if (existingUser) {
            res.send({
                message: "登录成功",
                error: false
            });
        }
        else {
            res.send({
                message: "账号或者密码错误",
                error: true
            });
        }
    });
};
exports.getUserInfo = function (req, res) {
    var userName = req.body.userName;
    User_1["default"].findOne({ userName: userName }, $findNot, function (err, existingUser) {
        if (err)
            throw err;
        if (existingUser) {
            res.send({
                message: "查询成功",
                error: false,
                data: existingUser
            });
        }
        else {
            res.send({
                message: "查询错误",
                error: true,
                data: {}
            });
        }
    });
};
exports.setUserInfo = function (req, res) {
    var _a = req.body, userName = _a.userName, nickname = _a.nickname, email = _a.email, avatar = _a.avatar, selfIntroduction = _a.selfIntroduction, sex = _a.sex;
    var data = { nickname: nickname, email: email, avatar: avatar, selfIntroduction: selfIntroduction, sex: sex };
    User_1["default"].update({ userName: userName }, { "$set": data }, function (err, raw) {
        if (err)
            throw err;
        if (raw) {
            res.send({
                message: "更新成功",
                error: false
            });
        }
        else {
            res.send({
                message: "更新失败",
                error: true
            });
        }
    });
};
