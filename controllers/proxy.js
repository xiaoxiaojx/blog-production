"use strict";
exports.__esModule = true;
var request = require("request");
exports.start = function (req, res) {
    if (req.query.real) {
        req.pipe(request(req.query.real)).pipe(res);
    }
    else {
        res.send({
            message: "代理参数设置错误!",
            error: true
        });
    }
};
