const { Schema } = require("mongoose");

const Cart = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "oder",
    },
    orderList: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
    collection: "carts",
    versionKey: false,
  }
);

module.exports = Cart;
