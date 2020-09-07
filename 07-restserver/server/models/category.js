const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const categorySchema = new Schema({
  description: {
    type: String,
    unique: true,
    required: [true, 'La descripción es obligatoria'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  state: {
    type: Boolean,
    default: true,
    required: false,
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
