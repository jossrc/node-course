const { request, response } = require('express');
const { uploadYourFile } = require('../helpers');

const { User, Product } = require('../models');

const uploadFiles = async (req = request, res = response) => {
  try {
    // const fileName = await uploadYourFile(req.files, ['txt', 'md'], 'texts');
    const fileName = await uploadYourFile(req.files, undefined, 'imgs');

    res.json({
      message: `El archivo ${fileName} se subió correctamente`,
      fileName,
    });
  } catch (message) {
    res.status(400).json({ message });
  }
};

const updateImage = async (req = request, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case 'usuarios':
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          message: `No existe un usuario con el id ${id}`,
        });
      }
      break;
    case 'productos':
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          message: `No existe un producto con el id ${id}`,
        });
      }
      break;
    default:
      return res.status(500).json({
        message: 'Colección en proceso de validación...',
      });
  }

  model.img = await uploadYourFile(req.files, undefined, collection);

  await model.save();

  res.json({
    message: 'Se actualizó correctamente la imagen',
    model,
  });
};

module.exports = {
  uploadFiles,
  updateImage,
};
