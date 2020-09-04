const express = require('express');

let { verifyToken } = require('../middlewares/authentication');

let app = express();

let Category = require('../models/category');

// Mostrar todas las categorías
app.get('/category', verifyToken, (req, res) => {
  Category.find({}).exec((err, categories) => {
    if (err) {
      return res.json({
        ok: false,
        err,
      });
    }

    Category.countDocuments({ state: true }, (err, count) => {
      res.json({
        ok: true,
        categories,
        count,
      });
    });
  });
});

// Mostrar una categoría por ID
app.get('/category/:id', (req, res) => {
  const { id } = req.params;

  Category.findById(id, (err, catg) => {
    if (err) {
      return res.json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      category: catg,
    });
  });

  // Category.findById()
});

// Crear nueva categoría
app.post('/category', (req, res) => {
  // Regresa la nueva categoria
  // Usar verifyToken
  // req.user._id
});

// Actualizar una categoría
app.put('/category/:id', (req, res) => {});

// Eliminar categoría
app.delete('/category/:id', (req, res) => {
  // Solo un administrador puede borrar categorias
  // token
});

module.exports = app;
