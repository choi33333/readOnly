const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const multer = require("multer");
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

// 페이지 로딩 함수
app.get("/", function (req, res) {
  res.render("./mainPage/index.html");
});

//api 호출
app.use("/api", router);

// 이미지 업로드를 위한 multer 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 이미지 파일을 저장할 디렉토리 경로 설정
    cb(null, "src/views/");
  },
  filename: (req, file, cb) => {
    // 업로드된 이미지 파일의 이름을 현재 시간 기반으로 생성
    const fileExt = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + fileExt);
  },
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// 정적 파일 서빙 설정
app.use(express.static("public"));

// 이미지 업로드를 처리할 라우트
app.post("/api/v1/upload", upload.single("image"), (req, res) => {
  const fileName = req.file.filename;
  const imgUrl = "/img/"+ fileName;
  res.json({
    error: null,
    data: imgUrl,
 });
});

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

// 서버 띄울때 포트 정보 셋팅 및 처음 실행 시 필요한 기능 수행 가능
app.listen(3000, function () {
  console.log("server running");
});
