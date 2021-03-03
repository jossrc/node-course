const { request, response } = require('express');
const { Category } = require('../models');

// getCategories - paginado - total - populate
// getCategory - populate {}

const getCategories = async (req = request, res = response) => {
  const { since = 0, limit = 5 } = req.query;
  const filter = { state: true };

  if (isNaN(Number(since)) || isNaN(Number(limit)))
    return res.status(400).json({
      message: 'Ingrese un valor inicial y/o limite válido',
    });

  const total = await Category.countDocuments(filter);

  if (since >= total)
    return res.status(400).json({
      message: `Ingrese un valor inicial (${since}) menor al total: ${total}`,
    });

  const categories = await Category.find(filter)
    .skip(Number(since))
    .limit(Number(limit))
    .populate('user', {
      name: true,
      uid: true,
    });

  res.json({
    message: 'Categoría(s) obtenida(s) correctamente',
    total,
    categories,
  });
};

const getCategory = async (req = request, res = response) => {
  const { id: categoryID } = req.params;

  const category = await Category.findById(categoryID).populate('user');

  res.json({
    message: 'Categoría obtenida',
    category,
  });
};

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

const updateCategory = async (req = request, res = response) => {
  // const authenticatedUser = req.authenticatedUser;
  const { id: categoryID } = req.params;
  const { name } = req.body;

  // Obtiene la categoría actualizada
  const category = await Category.findByIdAndUpdate(
    categoryID,
    { name },
    { new: true }
  );

  res.json({
    message: 'Categoría actualizada correctamente',
    category,
  });
};

// deleteCategory - estado : false
const deleteCategory = async (req = request, res = response) => {
  const { id: categoryID } = req.params;

  const category = await Category.findByIdAndUpdate(
      categoryID,
      { state: false },
      { new: true }
  );

  res.json({
    message: 'La categoría se eliminó correctamente',
    category,
  });
}


module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory
};
