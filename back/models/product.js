const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  images: [String],
  createdAt: {
    type: Date,
    default: new Date()
  }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
