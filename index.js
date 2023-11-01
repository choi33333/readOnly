const express = require("express");
const ejs = require("ejs"); 
const app = express();
const mongoose = mongoose();

// view 엔진을 ejs를 쓰겠다는 설정
app.set("view engine", "ejs");

// 페이지 로딩 함수
app.get("/", function(req, res){
    //console.log(res);
    res.render("index", {}); // views 폴더 밑에 있는 파일을 참조함
});

// 서버 띄울때 포트 정보 셋팅 및 처음 실행 시 필요한 기능 수행 가능
app.listen(3000, function(){
    console.log("server running");
});