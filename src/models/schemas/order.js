const { Schema } = require("mongoose");
const { product } = require("./product");

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
      // 아래 값 중 하나일때만 허용
      enum: [
        "결제 완료",
        "배송 준비중",
        "배송 시작",
        "배송 완료"
      ],
      required: true,
    },
    
      products: {
        type: [product],
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
