const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, dataValidator, existsRole, verifyAdminRole } = require('../middlewares');
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/category');
const { existsCategory } = require('../helpers/db-validators');

const router = Router();

router.get('/', getCategories);

router.get(
  '/:id',
  [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(async (id) => {
      await existsCategory(id);
    }),
    dataValidator,
  ],
  getCategory
);

router.post(
  '/',
  [
    validateJWT,
    existsRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    dataValidator,
  ],
  createCategory
);

router.put(
  '/:id',
  [
    validateJWT,
    existsRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(async (id) => {
      await existsCategory(id);
    }),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    dataValidator,
  ],
  updateCategory
);

router.delete('/:id', [
    validateJWT,
    verifyAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(async (id) => {
        await existsCategory(id);
    }),
    dataValidator,
] , deleteCategory);

module.exports = router;
