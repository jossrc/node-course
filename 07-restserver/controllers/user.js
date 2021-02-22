const { request, response } = require('express');

/**
 * Obtiene todos los usuarios
 * @param req Request
 * @param res Response
 */
const getUsers = (req = request, res = response) => {
  res.json({
    message: 'GET API - USUARIOS - CONTROLLER',
  });
};

const postUsers = (req = request, res = response) => {
  const { name, age } = req.body;

  res.json({
    message: 'POST API - USUARIOS - CONTROLLER',
    user: {
      name,
      age,
    },
  });
};

const putUsers = (req = request, res = response) => {
  res.json({
    message: 'PUT API - USUARIOS - CONTROLLER',
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
