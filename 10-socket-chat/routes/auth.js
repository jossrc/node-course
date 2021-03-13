const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth');
const { dataValidator } = require('../middlewares/dataValidator');

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

module.exports = router;
