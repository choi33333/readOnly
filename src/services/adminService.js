const { CategoryModel, OrderModel, ProductModel, UserModel } = require("../models");

const adminService = {
  // CATEGORY
  async getCategories() {
    const categories = await CategoryModel.find({}).lean().catch((error) => { // 다른 DB query/update 코드에도 추가해줄 것
      const newError = new Error("DB Error");
      newError.status = 500;
      newError.options.cause = error;
      throw newError;
    });

    return categories;
  },

  async createCategory(name) {
    if (!name) {
      const error = new Error("카테고리를 입력해주세요.");
      error.status = 400;
      throw error;
    }

    const foundCategory = await CategoryModel.findOne({ name: name }).lean();

    if (foundCategory !== null) {
      const error = new Error("이미 존재하는 카테고리입니다.");
      error.status = 409;
      throw error;
    }

    const category = await CategoryModel.create({
      name: name,
    });

    return category;
  },

  async deleteCategory(id) {
    const deletedCategory = await CategoryModel.findOneAndDelete({
      _id: id,
    }).lean();

    if (deletedCategory === null) {
      const error = new Error("존재하지 않는 카테고리입니다.");
      error.status = 404;
      throw error;
    }

    return deletedCategory;
  },

  // ORDER
  async getOrders() {
    const orders = await OrderModel.find({}).lean();
    return orders;
  },

  async updateOrder(id, orderStatus) {
    const order = await OrderModel.findById(id).lean();

    if (order === null) {
      const error = new Error("주문이 존재하지 않습니다.");
      error.status = 404;
      throw error;
    }

    const updatedOrder = await OrderModel.updateById(
      id,
      { orderStatus }
    );

    return updatedOrder;
  },

  async deleteOrder(id) {
    const order = await OrderModel.findByIdAndDelete(id);

    if (order === null) {
      const error = new Error("주문이 존재하지 않습니다.");
      error.status = 404;
      throw error;
    }
    return;
  },

  // PRODUCT
  async getProducts() {
    const products = await ProductModel.find({}).lean();
    return products;
  },

  async createProduct(productData) {
    const {
      name,
      category,
      author,
      price,
      imageUrl,
      productInfo,
      releasedDate,
    } = productData;
    const foundCategory = await CategoryModel.findOne({ name: category }).lean();

    const product = await ProductModel.create({
      name: name,
      category: foundCategory._id,
      categoryName: foundCategory.name,
      author: author,
      price: price,
      imageUrl: imageUrl,
      productInfo: productInfo,
      releasedDate: releasedDate,
      soldAmount: 0,
    });

    return product.toObject(); // POJO화 => Plain Old JavaScript Object
  },

  async updateProduct(id, productData) {
    const {
      name,
      category,
      author,
      price,
      imageUrl,
      productInfo,
      releasedDate,
    } = productData;

    const product = await ProductModel.findOne({ _id: id }).lean();

    if (!product) {
      const error = new Error("제품이 존재하지 않습니다.");
      error.status = 401;
      throw error;
    }
    const categoryId = await CategoryModel.findOne({ name: category });

    const updatedProduct = await ProductModel.updateOne(
      { _id: id },
      {
        name: name,
        category: categoryId._id,
        categoryName: category,
        author: author,
        price: price,
        imageUrl: imageUrl,
        productInfo: productInfo,
        releasedDate: releasedDate,
      }
    );

    return updatedProduct;
  },

  async deleteProduct(id) {
    // const product = await ProductModel.findById({ _id: id }).lean();
    const deletedProduct = await ProductModel.findByIdAndDelete(id).lean();

    if (deletedProduct === null) {
      const error = new Error("제품이 존재하지 않습니다.");
      error.status = 404;
      return next(error);
    }

    return deletedProduct;
  },

  // USER
  async getUser() {
    const users = await UserModel.find({}).lean();

    return users;
  },

  async deleteUser(id) {
    const deletedUser = await UserModel.findByIdAndDelete(id).lean();

    if (deletedUser === null) {
      const error = new Error("사용자가 존재하지 않습니다.");
      error.status = 404;
      throw error;
    }

    return deletedUser;
  },
};

module.exports = adminService;
