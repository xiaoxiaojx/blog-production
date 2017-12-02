"use strict";
exports.__esModule = true;
var User_1 = require("../models/User");
var $findNot = { "_id": 0, "__v": 0 };
var userInfo = {};
function quickGetUserInfo(userName) {
    return new Promise(function (res, rej) {
        if (userInfo["userName"]) {
            res(userInfo["userName"]);
        }
        else {
            User_1["default"].findOne({ userName: userName }, $findNot, function (err, doc) {
                if (err)
                    throw err;
                if (doc) {
                    userInfo["userName"] = doc;
                    res(doc);
                }
                else {
                    rej("error");
                }
            });
        }
    });
}
exports.quickGetUserInfo = quickGetUserInfo;
