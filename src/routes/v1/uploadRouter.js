const { Router } = require("express");
const multer = require("multer");
const path = require("path");

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // 이미지 파일을 저장할 디렉토리 경로 설정
      cb(null, "src/views/img");
    },
    filename: (req, file, cb) => {
      // 업로드된 이미지 파일의 이름을 현재 시간 기반으로 생성
      const fileExt = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + fileExt);
    },
  });
  
  const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });
  
  // 이미지 업로드를 처리할 라우트
  router.post("/", upload.single("image"), (req, res) => {
    const fileName = req.file.filename;
    const imgUrl = "/img/"+ fileName;
    res.json({
      error: null,
      data: imgUrl,
   });
  });

  module.exports = router;
