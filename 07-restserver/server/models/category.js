const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'El nombre es obligatorio'],
  },
  state: {
    type: Boolean,
    default: true,
    required: false,
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
