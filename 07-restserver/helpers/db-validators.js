const { Category, Role, User, Product } = require("../models");

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

const existsCategory = async (id) => {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    const category = await Category.findById(id);
    if (!category) throw new Error(`La categoría con id ${id} no existe`);
  } else {
    throw new Error(`La categoría con id ${id} no existe`);
  }
}

const existsProduct = async (id) => {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    const category = await Product.findById(id);
    if (!category) throw new Error(`El producto con id ${id} no existe`);
  } else {
    throw new Error(`El producto con id ${id} no existe`);
  }
}

/**
 * Validar colecciones permitidas
 * @param collection {string} Colección a verificar
 * @param collections {string[]} Lista de colecciones existentes
 */
const validateAllowedCollections = (collection = '', collections = []) => {

  const isIncluded = collections.includes(collection);
  if ( !isIncluded ) {
    throw new Error(`La colección ${collection} no es permitida - [${collections}]`)
  }

  return true

}

module.exports = {
  isValidRole,
  existsEmail,
  existsUserById,
  existsCategory,
  existsProduct,
  validateAllowedCollections
};
