const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require('path');
const app = express();

const authRouter = require("./routes/authRouter");
const adminCategoryRouter = require("./routes/adminCategoryRouter");
const adminProductRouter = require("./routes/adminProductRouter");
const productRouter = require('./routes/productRouter');
const orderRouter = require('./routes/orderRouter');
const categoryRouter = require("./routes/categoryRouter");
const isAuthenticated = require('./middlewares/index');

require("dotenv").config();
const mongodbUrI = process.env.MONGODB;

mongoose
  .connect(
    mongodbUrI
  )
  .then(() => console.log("connected"))
  .catch(() => console.log("failed"));

// view 엔진을 ejs를 쓰겠다는 설정

app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/views')));

// 페이지 로딩 함수
app.get("/", function (req, res) {
  res.render("./mainpage/index.html"); // views 폴더 밑에 있는 파일을 참조함
});

// 회원가입 페이지 router 이동
app.use("/", authRouter);

//상품
app.use('/', productRouter);

//주문
app.use('/', orderRouter);

//카테고리 조회
app.use('/', categoryRouter);


// ADMIN

// 카테고리 만들기 router
app.use("/", adminCategoryRouter);


// admin 상품
app.use("/", adminProductRouter);

// 해당되는 URL이 없을 때를 대비한 미들웨어
app.use((req, res, next) => {
  const error = new Error("Resource not found");
  error.statusCode = 404;
  next(error);
});

// 에러 핸들러 등록
app.use((error, req, res, next) => {
  console.log(error);
  res.statusCode = error.statusCode ?? 500;
  res.json({
    data: null,
    error: error.message,
  });
});


// 서버 띄울때 포트 정보 셋팅 및 처음 실행 시 필요한 기능 수행 가능
app.listen(3000, function () {
  console.log("server running");
});

