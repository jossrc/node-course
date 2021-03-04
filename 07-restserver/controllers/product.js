const { request, response } = require('express');
const { Product } = require('../models');

const getProducts = async (req = request, res = response) => {
  const { since = 0, limit = 5 } = req.query;
  const filter = { state: true };

  if (isNaN(Number(since)) || isNaN(Number(limit)))
    return res.status(400).json({
      message: 'Ingrese un valor inicial y/o limite válido',
    });

  const total = await Product.countDocuments(filter);

  if (since >= total)
    return res.status(400).json({
      message: `Ingrese un valor inicial (${since}) menor al total: ${total}`,
    });

  const products = await Product.find(filter)
    .skip(Number(since))
    .limit(Number(limit))
    .populate('user', {
      name: true,
    })
    .populate('category', {
      name: true,
    });

  res.json({
    message: 'Producto(s) obtenido(s) correctamente',
    total,
    products,
  });
};

const getProduct = async (req = request, res = response) => {
  const { id: productId } = req.params;

  const product = await Product.findById(productId)
    .populate('user')
    .populate('category');

  res.json({
    message: 'Producto obtenido',
    product,
  });
};

const createProduct = async (req = request, res = response) => {
  const data = req.body;
  data.user = req.authenticatedUser._id;

  const productDB = await Product.findOne({
    name: data.name,
    category: data.category,
  });

  if (productDB)
    return res.status(400).json({
      message: `El producto ${data.name} de la categoría ${data.category} ya existe`,
    });

  const product = new Product(data);
  await product.save();

  res.json({
    message: 'Se a creado un nuevo producto',
    product,
  });
};

const updateProduct = async (req = request, res = response) => {
  const data = req.body;
  const { id: productId } = req.params;
  data.user = req.authenticatedUser._id;

  const product = await Product.findByIdAndUpdate(productId, data, {
    new: true,
  });

  res.json({
    message: 'Producto actualizado correctamente',
    product,
  });
};

const deleteProduct = async (req = request, res = response) => {
  const { id: productId } = req.params;

  const product = await Product.findByIdAndUpdate(
    productId,
    { state: false },
    { new: true }
  );

  res.json({
    message: 'El producto se eliminó correctamente',
    product,
  });
};

module.exports = {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
