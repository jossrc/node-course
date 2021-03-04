const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, ' El nombre es obligatorio'],
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  description: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = model('Product', ProductSchema);
