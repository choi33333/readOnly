const { Schema } = require("mongoose");

const Category = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "categories",
    versionKey: false,
  }
);

module.exports = Category;
