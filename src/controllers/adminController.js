const adminService = require("../services/adminService");

const adminController = {
  // CATEGORY
  async getCategories(req, res) {
    const categories = await adminService.getCategories();

    res.json({
      error: null,
      data: categories,
    });
  },

  async createCategory(req, res) {
    const { name } = req.body;
    const category = await adminService.createCategory(name);

    res.json({
      error: null,
      data: category,
      message: category.name + " 카테고리를 성공적으로 생성 했습니다.",
    });
  },

  async deleteCategory(req, res) {
    const { name } = req.params;
    const deletedCategory = await adminService.deleteCategory(name);

    res.json({
      error: null,
      data: deletedCategory,
      message: deletedCategory.name + " 카테고리를 성공적으로 제거 했습니다.",
    });
  },

  // ORDER
  async getOrders(req, res) {
    const orders = await adminService.getOrders();

    res.json({
        error: null,
        data: orders,
    });
  },

  async updateOrder(req, res) {
    const { id } = req.params;
    const { orderStatus } = req.body;
    const updatedOrder = await adminService.updateOrder(id, orderStatus);

    res.json({
        error: null,
        data: updatedOrder,
    });
  },

  async deleteOrder(req, res) {
    const { id } = req.params;
    const deletedOrder = await adminService.deleteOrder(id);

    res.json({
        error: null,
        data: deletedOrder,
        message: "주문목록에서 제거되었습니다.",
    });
  },

  // PRODUCT
  async getProducts(req, res) {
    const products = await adminService.getProducts();

    res.json({
        error: null,
        data: products,
    });
  },

  async createProduct(req, res) {
    const productData =
    req.body;
    const product = await adminService.createProduct(productData);

    res.json({
        error: null,
        data: product,
    });
  },

  async updateProduct(req, res) {
    const { id } = req.params;
    const productData = req.body;
    const updatedProduct = await adminService.updateProduct(id, productData);

    res.json({
        error: null,
        data: updatedProduct,
      });
  },

  async deleteProduct(req, res){
    const { id } = req.params;
    const deletedProduct = await adminService.deleteProduct(id);

    res.json({
        error: null,
        data: deletedProduct,
    });
  },

  // USER
  async getUser(req, res){
    const users = await adminService.getUser();

    res.json({
        error: null,
        data: users,
    });
  },

  async deleteUser(req, res){
      const { id } = req.params;
    const deletedUser = await adminService.deleteUser(id);

    res.json({
        error: null,
        data: deletedUser,
        message: "사용자가 삭제되었습니다.",
    });
  }
};

module.exports = adminController;
