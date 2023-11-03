const { Schema } = require("mongoose");

const Order = new Schema(
  {
    productId: {
      ref: "Product",
    },
    quantity: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
    collection: "orders",
    versionKey: false,
  }
);

module.exports = Category;
