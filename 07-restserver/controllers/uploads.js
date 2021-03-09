const { request, response } = require('express');
const { uploadYourFile  } = require('../helpers');

const uploadFiles = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.myFile) {
    return res.status(400).json({
      message: 'No hay archivos que subir',
    });
  }

  const fileName = await uploadYourFile(req.files);

  res.json({
    message: `El archivo ${fileName} se subió correctamente`,
    fileName
  })

};

module.exports = {
  uploadFiles,
};
