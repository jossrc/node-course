const validateFileUpload = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.myFile) {
    return res.status(400).json({
      message: 'No hay archivos que subir - [input:name: myFile]',
    });
  }

  next();
};

module.exports = {
  validateFileUpload,
};
