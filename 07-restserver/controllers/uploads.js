const { request, response } = require('express');
const { uploadYourFile } = require('../helpers');

const uploadFiles = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.myFile) {
    return res.status(400).json({
      message: 'No hay archivos que subir',
    });
  }

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

  res.json({
    id,
    collection
  })
}

module.exports = {
  uploadFiles,
  updateImage
};
