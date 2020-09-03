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
          message: 'Token no válido',
        },
      });
    }

    req.user = decoded.user;
    next();
  });
};

// ====================
// Verificar AdminRole
// ====================

const verifyAdminRole = (req, res, next) => {
  let user = req.user;

  if (user.role === 'ADMIN_ROLE') {
    next();
    return true;
  }

  return res.json({
    ok: false,
    err: {
      message: 'El usuario no es administrador',
    },
  });
};

module.exports = {
  verifyToken,
  verifyAdminRole,
};
