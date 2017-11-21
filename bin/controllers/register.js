"use strict";
exports.__esModule = true;
var User_1 = require("../models/User");
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
