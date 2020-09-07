const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es necesario'],
  },
  unitPrice: {
    type: Number,
    required: [true, 'El precio unitario es necesario'],
  },
  description: {
    type: String,
    required: false,
  },
  state: {
    type: Boolean,
    required: true,
    default: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Product', productSchema);
