import { Request, Response } from "express";
import User from "../models/User";

export const register = (req: Request, res: Response) => {
    const { userName, nickname, password } = req.body;
    User.findOne({userName: userName}, (err, existingUser) => {
        if ( err ) throw err;
        if (existingUser) {
            res.send({
                message: "该用户已存在",
                error: true
            });
        }
        else {
            User.insertMany({userName, nickname, password}, (err, doc) => {
                res.send({
                    message: "注册成功",
                    error: false
                });
            });
        }
    });
};

export const login = (req: Request, res: Response) => {
    const { userName, password } = req.body;
    User.findOne({userName, password}, (err, existingUser) => {
        if ( err ) throw err;
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