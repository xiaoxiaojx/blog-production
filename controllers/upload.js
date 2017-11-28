"use strict";
exports.__esModule = true;
function uploadImg(req, res) {
    var filename = req.file.filename;
    if (filename) {
        res.send({
            message: "上传成功",
            error: false,
            data: "/" + filename
        });
    }
    else {
        res.send({
            message: "上传失败",
            error: true,
            data: ""
        });
    }
}
exports.uploadImg = uploadImg;
