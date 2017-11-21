import * as express from "express";
import * as path from "path";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as cors from "cors";

import * as homeController from "./controllers/home";
import * as test from "./controllers/test";
import * as Services from "./controllers";

const app = express();

mongoose.connect("mongodb://localhost:27017");
mongoose.connection.on("error", () => {
  console.log("MongoDB connection error. Please make sure MongoDB is running.");
  process.exit();
});

app.use(cors());
app.use(logger("dev") as any);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser() as any);
app.use(express.static(path.join(__dirname, "dist")));

app.get("/", homeController.index);
app.post("/api/test", test.test);
app.post("/api/register", Services.register);
app.post("/api/login", Services.login);

module.exports = app;