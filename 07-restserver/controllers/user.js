const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

/**
 * Obtiene los primeros cinco usuarios o
 * pueden obtenerse según el valor inicial
 * y su límite. Estos valores son
 * de los query params.
 * @param req Request
 * @param res Response
 */
const getUsers = async (req = request, res = response) => {
  const { since = 0, limit = 5 } = req.query;
  const filter = { state: true };

  if (isNaN(Number(since)) || isNaN(Number(limit)))
    return res.status(400).json({
      message: 'Ingrese un valor inicial y/o limite válido',
    });

  const [total, users] = await Promise.all([
    User.countDocuments(filter),
    User.find(filter).skip(Number(since)).limit(Number(limit)),
  ]);

  res.json({
    message: 'Usuarios obtenidos exitosamente',
    total,
    users,
  });
};

const postUsers = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.json({
    message: 'Nuevo usuario agregado a la BD',
    user,
  });
};

const putUsers = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...importantDataUser } = req.body;

  //TODO: Validar password con la base de datos
  if (password) {
    const salt = bcryptjs.genSaltSync();
    importantDataUser.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, importantDataUser);

  res.json({
    message: 'Usuario actualizado correctamente',
    user,
  });
};

const patchUsers = (req = request, res = response) => {
  res.json({
    message: 'PATCH API - USUARIOS - CONTROLLER',
  });
};

const deleteUsers = async (req = request, res = response) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, {state: false});

  res.json({
    message: 'Usuario eliminado',
    user
  });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
};
