const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

// Permite que los archivos se encuentren en el req.files
app.use(fileUpload({ useTempFiles: true }));

app.put('/upload', (req, res) => {
  if (!req.files) {
    return res.status(400).json({
      ok: false,
      err: {
        message: 'No se ha seleccionado ningún archivo',
      },
    });
  }

  // req.files.<Nombre (name) del input>
  // Usando postman es en body > form-data
  let myFile = req.files.file;

  // Permite mover a un directorio
  myFile.mv('uploads/filename.jpg', (err) => {
    if (err) {
      res.status(500).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      message: 'File Uploaded',
    });
  });
});

module.exports = app;