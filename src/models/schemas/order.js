const { Schema } = require("mongoose");

const Order = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "order",
    },
    orderNumber: {
      type: String,
      required: true,
    },
    orderUserId: {
      type: String,
      required: true,
    },
    orderUserAddress: {
      type: String,
      required: true,
    },
    orderUserPhoneNumber: {
      type: String,
      required: true,
    },
    orderProcces: {
      type: String,
      required: true,
    },
    orderList: {
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

module.exports = Order;
