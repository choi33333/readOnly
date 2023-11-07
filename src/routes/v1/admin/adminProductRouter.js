const { Router } = require("express");
const { ProductModel, CategoryModel } = require("../../../models");
const isAdmin = require("../../../middlewares/admin");
const router = Router();

// 상품 조회
router.get("/", isAdmin, async (req, res, next) => {
  const products = await ProductModel.find({}).lean();

  res.json({
    error: null,
    data: products,
  });
});

// 상품 등록
router.post("/", isAdmin, async (req, res, next) => {
  const { name, category, author, price, imageUrl, productInfo, releasedDate } =
    req.body;

  const categoryId = await CategoryModel.findOne({ _id: category });

  const products = await ProductModel.create({
    name: name,
    category: categoryId,
    author: author,
    price: price,
    imageUrl: imageUrl,
    productInfo: productInfo,
    releasedDate: releasedDate,
    soldAmount: 0,
  });

  res.json({
    error: null,
    data: products,
  });
});

// 상품 수정
router.put("/:id", isAdmin, async (req, res, next) => {
  const id = req.params.id;
  const {
    productName,
    category,
    author,
    price,
    image,
    productInfo,
    releasedDate,
  } = req.body;

  const product = await ProductModel.findOne({ _id: id }).lean();

  if (!product) {
    const error = new Error("제품이 존재하지 않습니다.");
    error.status = 401;
    return next(error);
  }

  // category를 프론트에서 id 값으로 받아와야한다.
  const categoryId = await CategoryModel.findOne({ _id: category });

  const updatedProduct = await ProductModel.updateOne(
    { _id: id },
    {
      name: productName,
      category: categoryId,
      author: author,
      price: price,
      imageUrl: image,
      productInfo: productInfo,
      releasedDate: releasedDate,
    }
  );

  res.json({
    error: null,
    data: updatedProduct,
  });
});

// 상품 삭제
router.delete("/:id", isAdmin, async (req, res, next) => {
  const id = req.params.id;
  const product = await ProductModel.findOne({ id: id }).lean();
  const deletedProduct = await ProductModel.deleteOne(product);

  if (!product) {
    const error = new Error("제품이 존재하지 않습니다.");
    error.status = 401;
    return next(error);
  }

  res.json({
    error: null,
    data: deletedProduct,
  });
});

module.exports = router;
