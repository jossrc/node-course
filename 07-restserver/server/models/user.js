const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let allowedRoles = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} no es un rol válido',
};

let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  email: {
    type: String,
    required: [true, 'El correo es necesario'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
  },
  img: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    enum: allowedRoles,
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

// Permite eliminar el password y solo ingresa el encriptado
userSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;

  return userObject;
};

userSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('User', userSchema);
