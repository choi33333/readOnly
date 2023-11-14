const { Schema } = require("mongoose");
const { productSchema } = require("./product");

const orderSchema = new Schema(
  {
    orderNumber: { // number
      type: String,
      required: true,
    },
    orderedEmail: { // email
      type: String,
      required: true,
    },
    orderedBy: {
      type: String,
      required: true,
    },
    postCode: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    addressDetail: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    orderStatus: { // status
      type: String,
      // 아래 값 중 하나일때만 허용
      enum: ["결제 완료", "배송 준비중", "배송중", "배송 완료", "취소", "취소 대기"],
      required: true,
    },

    products: {
      type: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "ProductModel", // 이름 주의
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "orders",
    versionKey: false,
  }
);

module.exports = orderSchema;
