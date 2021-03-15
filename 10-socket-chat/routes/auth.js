const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn, renewAndValidateToken } = require('../controllers/auth');
const { dataValidator, validateJWT } = require('../middlewares');

const router = Router();

router.post(
  '/login',
  [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    dataValidator,
  ],
  login
);

router.post(
  '/google',
  [
    check('id_token', 'El id_token de google es necesario').not().isEmpty(),
    dataValidator,
  ],
  googleSignIn
);

router.get('/', validateJWT, renewAndValidateToken )

module.exports = router;
