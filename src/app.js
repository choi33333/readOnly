const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const app = express();

const router = require("./routes/index");

require("dotenv").config();
const mongodbUrI = process.env.MONGODB;

mongoose
  .connect(mongodbUrI)
  .then(() => console.log("connected"))
  .catch(() => console.log("failed"));

// view 엔진을 ejs를 쓰겠다는 설정

app.engine("html", require("ejs").renderFile);
app.set("views", __dirname + "/views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/views")));
app.use("/public", express.static("public"));

// 페이지 로딩 함수
app.get("/", function (req, res) {
  res.render("./mainpage/index.html"); // views 폴더 밑에 있는 파일을 참조함
});

app.use("/api", router);

// 해당되는 URL이 없을 때를 대비한 미들웨어
app.use((req, res, next) => {
  const error = new Error("Resource not found");
  error.statusCode = 404;
  next(error);
});

// 에러 핸들러 등록
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status).json({
    error: err.message,
    data: null,
  });
});

const date = new Date();

console.log(date.getTime().toString().slice(6))
console.log(String(Math.floor(Math.random()*10000)).padStart(4,"0"))

// 서버 띄울때 포트 정보 셋팅 및 처음 실행 시 필요한 기능 수행 가능
app.listen(3000, function () {
  console.log("server running");
});
