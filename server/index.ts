import http from "http";
import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import router from "./src/routes";
import { connectDatabase } from "./src/configs/db";

var app = express();
app.use(cors());
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/crash", router);
connectDatabase();

const port = 5000;
app.listen(port, () => console.log(`Server started on ${port}`));
