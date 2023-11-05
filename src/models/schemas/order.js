const { Schema } = require("mongoose");
const { productType } = require("./product");

const order = new Schema(
  {
    orderNumber: {
      type: String,
      required: true,
    },
    orderedBy: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
    },
    
      products: {
        type: [productType],
        required: true,
      }
    
  },
  {
    timestamps: true,
    collection: "orders",
    versionKey: false,
  }
);

module.exports = order;
