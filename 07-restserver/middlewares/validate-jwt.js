const jwt = require('jsonwebtoken');
const { request, response } = require('express');
const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {
  // Se establece el nombre de nuestro header
  const token = req.header('x-token');

  if (!token)
    return res.status(401).json({
      message: 'No hay token en la petición',
    });

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    // Se envía el usuario autenticado por la request a nivel global
    const authenticatedUser = await User.findById(uid);

    if (!authenticatedUser)
      return res.status(401).json({
        message: 'Token no válido - usuario no existe en la BD',
      });

    if (!authenticatedUser.state)
      return res.status(401).json({
        message: 'Token no válido - usuario eliminado',
      });

    req.authenticatedUser = authenticatedUser;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: 'Token no válido',
    });
  }
};

module.exports = {
  validateJWT,
};
