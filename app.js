const express = require("express");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();


mongoose.connect('mongodb+srv://WebProjectDB:45654654@alicewebprojectteam8.pqahg4p.mongodb.net/WebPro8')
    .then(() => console.log('connected'))
    .catch(() => console.log('failed'));
    

// view 엔진을 ejs를 쓰겠다는 설정
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 페이지 로딩 함수
app.get("/", function (req, res) {
    res.render("index"); // views 폴더 밑에 있는 파일을 참조함
});
app.get("/sign-up", function (req, res) {
    res.render("sign-up");
});
app.get("/sign-in", function (req, res) {
    res.render("sign-in");
});


// 회원가입 페이지 router 이동
const indexRouter = require('./routes/sign-up');
app.use('/', indexRouter);


// 서버 띄울때 포트 정보 셋팅 및 처음 실행 시 필요한 기능 수행 가능
app.listen(3000, function () {
    console.log("server running");
});