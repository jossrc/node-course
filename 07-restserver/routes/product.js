const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, dataValidator, existsRole, verifyAdminRole } = require('../middlewares');
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/product.js');

const router = Router();

router.get('/', getProducts);

router.get(
    '/:id',
    [
        check('id', 'No es un id de Mongo válido').isMongoId(),
        check('id').custom(async (id) => {
            //await existsCategory(id);
        }),
        dataValidator,
    ],
    getProduct
);

router.post(
    '/',
    [
        validateJWT,
        existsRole('ADMIN_ROLE', 'SALES_ROLE'),
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        dataValidator,
    ],
    createProduct
);

router.put(
    '/:id',
    [
        validateJWT,
        existsRole('ADMIN_ROLE', 'SALES_ROLE'),
        check('id', 'No es un id de Mongo válido').isMongoId(),
        check('id').custom(async (id) => {
           // await existsCategory(id);
        }),
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        dataValidator,
    ],
    updateProduct
);

router.delete('/:id', [
    validateJWT,
    verifyAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(async (id) => {
        //await existsCategory(id);
    }),
    dataValidator,
] , deleteProduct);

module.exports = router;
