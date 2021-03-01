const jwt = require('jsonwebtoken');
const { request, response } = require('express');

const validateJWT = (req = request, res = response, next) => {
  // Se establece el nombre de nuestro header
  const token = req.header('x-token');

  if (!token)
    return res.status(401).json({
      message: 'No hay token en la petición',
    });

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    // Se envía el uid por la request a nivel global
    req.uid = uid;

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
