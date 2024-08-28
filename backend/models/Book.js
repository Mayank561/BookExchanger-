const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  ownerName: {
    type: String,
    required: true,
  },
  wishListdBy: [
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
  ],
  isSold: {
    type: Boolean,
    default: false,
  },
  bookName: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    requied: true,
  },
  branch: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    requied: true,
  },
  condition: {
    type: String,
    required: true,
  },
  priceType: {
    type: String,
    required: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  selectedFeild: {
    type: String,
  },
  author: {
    type: String,
    required: true,
  },
  tags: [String],
  noOfpages: {
    type: Number,
    required: true,
  },
  edition: {
    type: String,
    required: true,
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  upatedAt: {
    type: Date,
    default: Date.now(),
  },
});
const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
