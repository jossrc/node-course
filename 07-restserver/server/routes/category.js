const express = require('express');

let { verifyToken, verifyAdminRole } = require('../middlewares/authentication');

let app = express();

let Category = require('../models/category');

app.get('/category', verifyToken, (req, res) => {
  Category.find({ state: true })
    .sort('description')
    .populate('user', 'name email')
    .exec((err, categories) => {
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

app.get('/category/:id', verifyToken, (req, res) => {
  const { id } = req.params;

  Category.findById(id, (err, catg) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    if (!catg) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'El ID no es correcto',
        },
      });
    }

    res.json({
      ok: true,
      category: catg,
    });
  });
});

app.post('/category', verifyToken, (req, res) => {
  const { description } = req.body;
  const id = req.user._id;

  const newCategory = new Category({
    description,
    user: id,
  });

  newCategory.save((err, category) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!category) {
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
});

app.put('/category/:id', verifyToken, (req, res) => {
  let { id } = req.params;

  Category.findByIdAndUpdate(
    id,
    req.body,
    { new: true, runValidators: true },
    (err, catg) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      if (!catg) {
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

app.delete('/category/:id', [verifyToken, verifyAdminRole], (req, res) => {
  let { id } = req.params;

  Category.findByIdAndUpdate(
    id,
    { state: false },
    { new: true, runValidators: true },
    (err, categoryDeleted) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      if (!categoryDeleted) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'El id no existe (Categoría no encontrada)',
          },
        });
      }

      res.json({
        ok: true,
        category: categoryDeleted,
      });
    }
  );
});

module.exports = app;
