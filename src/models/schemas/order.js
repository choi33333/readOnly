const { Schema } = require("mongoose");

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
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "orders",
    versionKey: false,
  }
);

module.exports = order;
