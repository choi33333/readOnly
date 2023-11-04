const { Schema } = require("mongoose");

const product = new Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    productInfo: {
        type: String,
    },
    releasedDate: {
        type: Date,
        required: true,
    },
    soldAmount: {
        type: Number,
        required: true,
    },
},{
    timestamps: true,
    collection: "product",
    versionKey: false,
});

module.exports = product;