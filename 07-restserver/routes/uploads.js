const { validateAllowedCollections } = require('../helpers');
const { Router } = require('express');
const { check } = require('express-validator');

const { uploadFiles, updateImage, showImage } = require('../controllers/uploads');
const { dataValidator, validateFileUpload } = require('../middlewares');

const router = Router();

router.post('/', validateFileUpload, uploadFiles);

router.put(
  '/:collection/:id',
  [
    validateFileUpload,
    check('id', 'Debe ser un id de Mongo válido').isMongoId(),
    check('collection').custom((c) =>
      validateAllowedCollections(c, ['usuarios', 'productos'])
    ),
    dataValidator,
  ],
  updateImage
);

router.get('/:collection/:id', [
    check('id', 'Debe ser un id de Mongo válido').isMongoId(),
    check('collection').custom((c) =>
        validateAllowedCollections(c, ['usuarios', 'productos'])
    ),
    dataValidator,
], showImage)

module.exports = router;
