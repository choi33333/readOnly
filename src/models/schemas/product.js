const { Schema } = require("mongoose");

const Product = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    productInfo: {
      type: String,
    },
    releasedDate: {
      type: String,
      required: true,
    },
    soldAmount: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "products",
    versionKey: false,
  }
);

module.exports = Product;
