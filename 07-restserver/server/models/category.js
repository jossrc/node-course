const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  state: {
    type: Boolean,
    required: false,
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
