const path = require('path');
const { request, response } = require('express');

const uploadFiles = (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.myFile) {
    return res.status(400).json({
      message: 'No hay archivos que subir',
    });
  }

  const { myFile } = req.files;
  const cutFileName = myFile.name.toLowerCase().split('.');
  const fileExtension = cutFileName[cutFileName.length - 1];

  // Validar la extensión
  const validFileExtensions = ['png', 'jpg', 'jpeg', 'gif', 'webp'];
  if (!validFileExtensions.includes(fileExtension)) {
    return res.status(400).json({
      message: `La extensión ${fileExtension} no es permitida, ${validFileExtensions}`
    })
  }

  const uploadPath = path.join(__dirname, '../uploads', myFile.name);

  myFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({
        err,
      });
    }

    res.json({
      message: 'Archivo subido a ' + uploadPath,
    });
  });
};

module.exports = {
  uploadFiles,
};
