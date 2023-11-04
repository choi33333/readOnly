const { Schema } = require("mongoose");

const category = new Schema(
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

module.exports = category;
