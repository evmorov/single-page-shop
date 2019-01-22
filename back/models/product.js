const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  images: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

ProductSchema.set('toJSON', {
  transform: (doc, ret) => {
    /* eslint-disable */
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    /* eslint-enable */
  }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
