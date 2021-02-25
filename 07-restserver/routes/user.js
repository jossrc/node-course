const { Router } = require('express');
const { check } = require('express-validator');

const {
  getUsers,
  putUsers,
  postUsers,
  patchUsers,
  deleteUsers,
} = require('../controllers/user');

const { dataValidator } = require('../middlewares/dataValidator');
const { isValidRole, existsEmail, existsUserById } = require("../helpers/db-validators");

const router = Router();

router.get('/', getUsers);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( async (id) => {
        await existsUserById(id);
    }),
    check('role').custom( async (role) => {
        await isValidRole(role);
    }),
    dataValidator,
] ,putUsers);

router.post(
  '/',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( async (email) =>  {
        await existsEmail(email);
    }),
    check('password', 'El password debe ser más de 6 dígitos').isLength({
      min: 6,
    }),
    check('role').custom( async (role) => {
      await isValidRole(role);
    }),
    dataValidator,
  ],
  postUsers
);

router.patch('/', patchUsers);

router.delete('/', deleteUsers);

module.exports = router;
