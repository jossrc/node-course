const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
  const existsRole = await Role.findOne({ role });
  if (!existsRole)
    throw new Error(`El rol ${role} no está registrado en la BD`);
};

const existsEmail = async (email = '') => {
  const foundEmail = await User.findOne({ email });
  if (foundEmail)
    throw new Error(`El email ${email} se encuentra registrado en la BD`);
};

const existsUserById = async (id) => {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    const existsUser = await User.findById(id);
    if (!existsUser) throw new Error(`El usuario con id ${id} no existe`);
  } else {
    throw new Error(`El usuario con id ${id} no existe`);
  }
};

module.exports = {
  isValidRole,
  existsEmail,
  existsUserById,
};
