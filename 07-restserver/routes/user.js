const { Router } = require('express');
const { check } = require('express-validator');

const {
  getUsers,
  putUsers,
  postUsers,
  patchUsers,
  deleteUsers,
} = require('../controllers/user');

const router = Router();

router.get('/', getUsers);

router.put('/:id', putUsers);

router.post('/', [check('email', 'El correo no es válido')], postUsers);

router.patch('/', patchUsers);

router.delete('/', deleteUsers);

module.exports = router;
