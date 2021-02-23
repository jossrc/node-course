const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

/**
 * Obtiene todos los usuarios
 * @param req Request
 * @param res Response
 */
const getUsers = (req = request, res = response) => {

  const { q, name = 'No name', apikey, page, limit } = req.query;

  res.json({
    message: 'GET API - USUARIOS - CONTROLLER',
    content : {
      q, name, apikey, page, limit
    }
  });
};

const postUsers = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Verificar si el correo existe

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync( password, salt );

  // Guardar en BD
  await user.save();

  res.json({
    message: 'POST API - USUARIOS - CONTROLLER',
    user
  });
};

const putUsers = (req = request, res = response) => {

  const { id } = req.params;

  res.json({
    message: 'PUT API - USUARIOS - CONTROLLER',
    id
  });
};

const patchUsers = (req = request, res = response) => {
  res.json({
    message: 'PATCH API - USUARIOS - CONTROLLER',
  });
};

const deleteUsers = (req = request, res = response) => {
  res.json({
    message: 'DELETE API - USUARIOS - CONTROLLER',
  });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
};
