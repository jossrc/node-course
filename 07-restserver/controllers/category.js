const { request, response } = require('express');
const { Category } = require('../models');

const createCategory = async (req = request, res = response) => {
  const name = req.body.name.trim().toUpperCase();
  const categoryDB = await Category.findOne({ name });

  if (categoryDB)
    return res.status(400).json({
      message: `La categoría ${categoryDB.name}, ya existe`,
    });

  // Generar la data a guardar
  const data = {
    name,
    user: req.authenticatedUser._id,
  };

  const category = new Category(data);

  // Guardar DB
  await category.save();

  res.status(201).json({
    message: 'Se a creado una nueva categoría',
    category,
  });
};

module.exports = {
  createCategory: createCategory,
};
