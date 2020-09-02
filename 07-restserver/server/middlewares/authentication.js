const jwt = require('jsonwebtoken');

// ====================
// Verificar Token
// ====================

const verifyToken = (req, res, next) => {
  let token = req.get('Authorization'); // Nombre del header

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
            message: 'Token no válido'
        },
      });
    }

    req.user = decoded.user;
    next();
  });

};

module.exports = {
  verifyToken,
};
