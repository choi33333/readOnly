const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs"); // 불필요한 require는 빼세요
const path = require("path");
const app = express();

const router = require("./routes"); // index는 빼셔도 됩니다.

const mongodbUrI = process.env.MONGODB;

mongoose
  .connect(mongodbUrI)
  .then(() => console.log("connected")) 
  .catch(() => console.log("failed")); // process를 멈추자

// view 엔진을 ejs를 쓰겠다는 설정


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/views")));

// 페이지 로딩 함수
app.get("/", function (req, res) {
  // res.redirect("/mainpage/index.html");
  res.redirect("/title/index.html");
});

//api 호출
app.use("/api", router);

// 해당되는 URL이 없을 때를 대비한 미들웨어
app.use((req, res, next) => {
  const error = new Error("Resource not found");
  error.statusCode = 404;
  next(error);
});

// 에러 핸들러 등록
app.use((error, req, res, next) => {
  console.log(error)
  if (error.status !== undefined && Math.floor(error.status / 100) === 5) {
     console.error(error);
  }
  res.status(error.status ?? 500).json({
    error: error.message,
    data: null,
  });
});


// 서버 띄울때 포트 정보 셋팅 및 처음 실행 시 필요한 기능 수행 가능
app.listen(3000, function () {
  console.log("server running");
});
