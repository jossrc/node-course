const express = require('express');

let { verifyToken, verifyAdminRole } = require('../middlewares/authentication');

let app = express();

let Category = require('../models/category');

// Mostrar todas las categorías
app.get('/category', verifyToken, (req, res) => {
  Category.find({}).exec((err, categories) => {
    if (err) {
      return res.status(400).json({
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
app.get('/category/:id', verifyToken, (req, res) => {
  const { id } = req.params;

  Category.findById(id, (err, catg) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      category: catg,
    });
  });
});

// Crear nueva categoría
app.post('/category', verifyToken, (req, res) => {
  const { name } = req.body;

  const newCategory = new Category({
    name,
  });

  newCategory.save((err, category) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      category,
    });

    console.log('Nueva categoría creada');
  });

  // Regresa la nueva categoria
  // Usar verifyToken
  // req.user._id
});

// Actualizar una categoría
app.put('/category/:id', verifyToken, (req, res) => {
  let { id } = req.params;

  Category.findByIdAndUpdate(
    id,
    req.body,
    { new: true, runValidators: true },
    (err, catg) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        category: catg,
      });
    }
  );
});

// Eliminar categoría
app.delete('/category/:id', [verifyToken, verifyAdminRole], (req, res) => {
  // Solo un administrador puede borrar categorias
  // token
});

module.exports = app;
