const express = require('express');

const { verifyToken } = require('../middlewares/authentication');

let app = express();
let Product = require('../models/product');

// Obtener todos los productos
app.get('/product', verifyToken, (req, res) => {
  // Trae todos los productos
  // Populate: user, category
  // paginado

  let since = req.query.since || 0;
  since = Number(since);

  Product.find({ state: true })
    .skip(since)
    .limit(5)
    .populate('user', 'name email')
    .populate('category', 'description')
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      Product.countDocuments({ state: true }, (err, count) => {
        res.json({
          ok: true,
          products,
          count,
        });
      });
    });
});

// Obtener producto por ID
app.get('/product/:id', verifyToken, (req, res) => {
  // Populate: user category
  // paginado

  let { id } = req.params;

  Product.findById(id)
    .populate('user', 'name email')
    .populate('category', 'description')
    .exec((err, product) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      if (!product) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'ID no existe',
          },
        });
      }

      res.json({
        ok: true,
        product,
      });
    });
});

// Crea un nuevo producto
app.post('/product', verifyToken, (req, res) => {
  // grabar el usuario
  // grabar una categoria del listado

  const idUser = req.user._id;
  const { name, unitPrice, description, category } = req.body;

  const newProduct = new Product({
    name,
    unitPrice,
    description,
    user: idUser,
    category,
  });

  newProduct.save((err, product) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!product) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Producto no encontrado',
        },
      });
    }

    res.json({
      ok: true,
      product,
    });
  });
});

// Actualizar un nuevo producto
app.put('/product/:id', (req, res) => {
  // Grabar el usuario
  // grabar una categoria del listado

  const { id } = req.params;
  const body = req.body;

  console.log(body);

  Product.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, product) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      if (!product) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'ID no existe',
          },
        });
      }

      res.json({
        ok: true,
        product,
      });
    }
  );
});

// Borrar un producto
app.delete('/product/:id', (req, res) => {
  // state false

  let { id } = req.params;

  Product.findByIdAndUpdate(
    id,
    { state: false },
    { new: true, runValidators: true },
    (err, product) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      if (!product) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'ID no existe',
          },
        });
      }

      res.json({
        ok: true,
        product,
        message: 'Producto Borrado'
      });
    }
  );
});

module.exports = app;
