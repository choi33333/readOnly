const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = path
const app = express();

const authRouter = require("./routes/authRouter");
const adminCategoryRouter = require("./routes/adminCategoryRouter");
const adminProductRouter = require("./routes/adminProductRouter");
const productRouter = require('./routes/productRouter');


mongoose
  .connect(
    "mongodb+srv://WebProjectDB:45654654@alicewebprojectteam8.pqahg4p.mongodb.net/WebPro8"
  )
  .then(() => console.log("connected"))
  .catch(() => console.log("failed"));

// view 엔진을 ejs를 쓰겠다는 설정
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path)

// 페이지 로딩 함수
app.get("/", function (req, res) {
  res.render("./mainpage/index.html"); // views 폴더 밑에 있는 파일을 참조함
});

// 회원가입 페이지 router 이동
app.use("/", authRouter);
// 카테고리 만들기 router
app.use("/", adminCategoryRouter);

// admin 상품등록
app.use("/", adminProductRouter);

// 상품 조회
app.use('/', productRouter);

// 서버 띄울때 포트 정보 셋팅 및 처음 실행 시 필요한 기능 수행 가능
app.listen(3000, function () {
  console.log("server running");
});
