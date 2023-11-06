const { Router } = require("express");
const { CategoryModel } = require("../models");

const router = Router();

// 카테고리 조회
router.get("/api/admin/cartegories", async (req, res) => {
  const catetories = await CategoryModel.find({}).lean();
  res.json({
    categories: catetories,
  });
});

// 카테고리 만들기
router.post("/api/admin/cartegories/:name", async (req, res) => {
  const { name } = req.params;

  if(name){
    const error = new Error("카테고리를 입력해주세요.");
    error.status = 400;
    return next(error);
  }

  const catetory = await CategoryModel.findOne({ name }).lean();

  if (catetory) {
    const error = new Error("이미 존재하는 카테고리입니다.");
    error.status = 409;
    return next(error);
  }

  catetory = await CategoryModel.create({
    name: name,
  });

  res
    .status(201)
    .json({ message: catetory.name + "카테고리 생성을 완료했습니다." });
});

// 카테고리 삭제
router.delete("/api/admin/cartegories/:name", async (req, res) => {
  const { name } = req.params.name;

  const catetory = await CategoryModel.deleteOne({ name });

  if (catetory) {
    const error = new Error("존재하지 않는 카테고리입니다.");
    error.status = 404;
    return next(error);
  }

  res
    .status(204)
    .json({
      message: catetory.name + "카테고리를 성공적으로 제거 했습니다.",
    });
});

module.exports = router;
