const { request, response } = require('express');

const getUsers = (req = request, res = response) => {
  res.json({
    message: 'GET API - USUARIOS - CONTROLLER',
  });
};

const postUsers = (req = request, res = response) => {
  res.json({
    message: 'POST API - USUARIOS - CONTROLLER',
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
