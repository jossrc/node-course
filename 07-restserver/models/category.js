const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
  name: {
    type: 'string',
    required: [true, ' El nombre es obligatorio'],
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = model('Category', CategorySchema);
