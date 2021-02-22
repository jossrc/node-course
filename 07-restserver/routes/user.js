const { Router } = require('express');
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

router.post('/', postUsers);

router.patch('/', patchUsers);

router.delete('/', deleteUsers);

module.exports = router;
