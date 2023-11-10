const { Schema } = require("mongoose");

const categorySchema = new Schema(
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

module.exports = categorySchema;
