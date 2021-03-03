const { Router } = require('express');
const { check } = require('express-validator');

const { dataValidator } = require('../middlewares/dataValidator');

const router = Router();

// Obtener todas las categorías - publico
router.get('/', (req, res) => {
    res.json({
        message: 'Todo ok - GET'
    });
})

// Obtener una categoría por id - público
router.get('/:id', (req, res) => {
    res.json({
        message: 'Todo ok - GET - ID'
    });
})

// Crear categoría - privado - cualquier persona con un token válido
router.post('/', (req, res) => {
    res.json({
        message: 'Todo ok - POST'
    });
})

// Actualizar - privado - cualquiera con token válido
router.put('/:id', (req, res) => {
    res.json({
        message: 'Todo ok - PUT'
    });
})

// Borrar una categoría - Admin
router.delete('/:id', (req, res) => {
    res.json({
        message: 'Todo ok - PUT - DELETE'
    });
})

module.exports = router;
