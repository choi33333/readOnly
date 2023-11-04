const { Schema } = require("mongoose");

const Order = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Products",
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

module.exports = Order;
