"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var Article_1 = require("../models/Article");
var quick_1 = require("./quick");
var $findNot = { "__v": 0 };
exports.publishArticle = function (req, res) {
    var _a = req.body, userName = _a.userName, nickname = _a.nickname, avatar = _a.avatar, title = _a.title, content = _a.content, date = _a.date, editor = _a.editor;
    Article_1["default"].insertMany({ userName: userName, nickname: nickname, avatar: avatar, title: title, content: content, date: date, editor: editor }, function (err, doc) {
        if (err)
            throw err;
        if (doc) {
            res.send({
                message: "发表成功",
                error: false
            });
        }
        else {
            res.send({
                message: "发表失败",
                error: true
            });
        }
    });
};
exports.getArticles = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var userName, filter, articleDocs, userInfos, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userName = req.body.userName;
                filter = userName ? { userName: userName } : {};
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        Article_1["default"].find(filter, $findNot, function (err, docs) {
                            if (err)
                                throw err;
                            resolve(docs);
                        });
                    })];
            case 1:
                articleDocs = _a.sent();
                return [4 /*yield*/, Promise.all(articleDocs.map(function (item) { return quick_1.quickGetUserInfo(item["userName"]); }))];
            case 2:
                userInfos = _a.sent();
                data = userInfos.map(function (item, index) { return ({
                    _id: articleDocs[index]["_id"],
                    userName: articleDocs[index]["userName"],
                    title: articleDocs[index]["title"],
                    content: articleDocs[index]["content"],
                    date: articleDocs[index]["date"],
                    like: articleDocs[index]["like"].length,
                    comment: articleDocs[index]["comment"].length,
                    editor: articleDocs[index]["editor"],
                    nickname: item["nickname"],
                    avatar: item["avatar"],
                    views: articleDocs[index]["views"]
                }); });
                res.send({
                    message: "查询成功",
                    error: false,
                    data: data
                });
                return [2 /*return*/];
        }
    });
}); };
exports.getArticle = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var id, articleDoc, userInfo, likeData, like, commentData, comment, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.body.id;
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        Article_1["default"].findOne({ _id: id }, $findNot, function (err, doc) {
                            if (err)
                                throw err;
                            resolve(doc);
                        });
                    })];
            case 1:
                articleDoc = _a.sent();
                return [4 /*yield*/, quick_1.quickGetUserInfo(articleDoc["userName"])];
            case 2:
                userInfo = _a.sent();
                return [4 /*yield*/, Promise.all(articleDoc.like.map(function (item) { return quick_1.quickGetUserInfo(item["userName"]); }))];
            case 3:
                likeData = _a.sent();
                like = likeData.map(function (item, index) { return ({
                    userName: item["userName"],
                    nickname: item["nickname"],
                    avatar: item["avatar"]
                }); });
                return [4 /*yield*/, Promise.all(articleDoc.comment.map(function (item) { return quick_1.quickGetUserInfo(item["userName"]); }))];
            case 4:
                commentData = _a.sent();
                comment = commentData.map(function (item, index) { return ({
                    userName: item["userName"],
                    nickname: item["nickname"],
                    avatar: item["avatar"],
                    content: articleDoc.comment[index]["content"],
                    date: articleDoc.comment[index]["date"]
                }); });
                data = {
                    _id: articleDoc["_id"],
                    userName: articleDoc["userName"],
                    title: articleDoc["title"],
                    content: articleDoc["content"],
                    date: articleDoc["date"],
                    like: like,
                    comment: comment,
                    editor: articleDoc["editor"],
                    nickname: userInfo["nickname"],
                    avatar: userInfo["avatar"],
                    views: articleDoc["views"]
                };
                res.send({
                    message: "查询成功",
                    error: false,
                    data: data
                });
                return [2 /*return*/];
        }
    });
}); };
exports.setArticle = function (req, res) {
    var _a = req.body, id = _a.id, reqData = _a.reqData;
    Article_1["default"].update({ _id: id }, { "$set": reqData }, function (err, raw) {
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
