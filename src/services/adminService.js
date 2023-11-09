const { CategoryModel, OrderModel, ProductModel, UserModel } = require("../models");

const adminService = {
    
  // CATEGORY
  async getCategories() {
    const categories = await CategoryModel.find({}).lean();

    return categories;
  },

  async createCategory(name) {
    if (!name) {
      const error = new Error("카테고리를 입력해주세요.");
      error.status = 400;
      throw error;
    }

    let category = await CategoryModel.findOne({ name: name }).lean();

    if (category) {
      const error = new Error("이미 존재하는 카테고리입니다.");
      error.status = 409;
      throw error;
    }

    category = await CategoryModel.create({
      name: name,
    });

    return category;
  },

  async deleteCategory(name) {
    const deletedCategory = await CategoryModel.findOneAndDelete({
      name: name,
    });

    if (!deletedCategory) {
      const error = new Error("존재하지 않는 카테고리입니다.");
      error.status = 404;
      throw error;
    }

    return deletedCategory;
  },

  // ORDER
  async getOrders() {
    const orders = await OrderModel.find({}).lean();

    if (orders == 0) {
      const error = new Error("주문이 존재하지 않습니다.");
      error.status = 401;
      throw error;
    }
    return orders;
  },

  async updateOrder(id, orderStatus) {
    const order = await OrderModel.findById(id).lean();

    if (!order) {
      const error = new Error("주문이 존재하지 않습니다.");
      error.status = 401;
      throw error;
    }

    order = await OrderModel.updateOne({
      orderStatus: orderStatus,
    });

    return order;
  },

  async deleteOrder(id) {
    const order = await OrderModel.findOneAndDelete({ _id : id });
    console.log(order);

    if (!order) {
      const error = new Error("주문이 존재하지 않습니다.");
      error.status = 404;
      throw error;
    }
  },

  // PRODUCT
  async getProducts(){
    const products = await ProductModel.find({}).lean();

    if (products == 0) {
        const error = new Error("상품이 존재하지 않습니다.");
        error.status = 401;
        throw error;
    };

    return products;
  }, 

  async createProduct(productData){
    const { name, category, author, price, imageUrl, productInfo, releasedDate } = productData;
    const categoryId = await CategoryModel.findOne({ name: category });

    const product = await ProductModel.create({
        name: name,
        category: category,
        categoryName: category,
        author: author,
        price: price,
        imageUrl: imageUrl,
        productInfo: productInfo,
        releasedDate: releasedDate,
        soldAmount: 0,
    });

    return product;
  },

  async updateProduct(id, productData){
    const {
        name,
        category,
        author,
        price,
        image,
        productInfo,
        releasedDate,
      } = productData;

      const product = await ProductModel.findOne({ _id: id }).lean();

        if (!product) {
            const error = new Error("제품이 존재하지 않습니다.");
            error.status = 401;
            throw error;
        }

        // category를 프론트에서 id 값으로 받아와야한다.
        const categoryId = await CategoryModel.findOne({ _id: category });

        const updatedProduct = await ProductModel.updateOne(
            { _id: id },
            {
            name: name,
            category: category,
            categoryName: category,
            author: author,
            price: price,
            imageUrl: image,
            productInfo: productInfo,
            releasedDate: releasedDate,
            }
        );

        return updatedProduct;
  }, 

  async deleteProduct(id){
    const product = await ProductModel.findById({ _id : id }).lean();
    const deletedProduct = await ProductModel.findOneAndDelete(product);

    if (!product) {
        const error = new Error("제품이 존재하지 않습니다.");
        error.status = 401;
        return next(error);
    };
    
    return deletedProduct;
  },

  // USER
  async getUser(){
    const users = await UserModel.find({}).lean();

    if (!users) {
        const error = new Error("사용자가 없습니다.");
        error.status = 404;
        throw error;
    };

    return users;
  },

  async deleteUser(id){
    const deletedUser = await UserModel.findOneAndDelete({ _id : id })
    .lean();

    if (!deletedUser || deletedUser.length === 0) {
        const error = new Error("사용자가 존재하지 않습니다.");
        error.status = 404;
        throw error;
    };

    return deletedUser;
  },
};

module.exports = adminService;
