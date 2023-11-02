const { Schema } = require("mongoose");
const shortId = require("./types/short-id");

const User = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
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
  },
  {
    timestamps: true,
    collection: "users",
    versionKey: false,
  }
);

module.exports = User;
