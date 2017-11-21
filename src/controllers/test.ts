import { Request, Response } from "express";

export const test = (req: Request, res: Response) => {
  console.log(req.body);
  res.send("init test");
};