const { validateAllowedCollections } = require("../helpers");
const { Router } = require('express');
const { check } = require('express-validator');

const { uploadFiles, updateImage } = require("../controllers/uploads");
const { dataValidator } = require('../middlewares/dataValidator');

const router = Router();

router.post('/', uploadFiles);

router.put('/:collection/:id', [
    check('id', 'Debe ser un id de Mongo válido').isMongoId(),
    check('collection').custom( c => validateAllowedCollections(c, [
        'usuarios',
        'productos'
    ])),
    dataValidator
], updateImage)


module.exports = router;
