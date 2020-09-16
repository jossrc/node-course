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
  let cutFileName = myFile.name.split('.');
  let extension = cutFileName[cutFileName.length - 1];

  // Extensiones permitidas
  let validExtensions = ['png', 'jpg', 'gif', 'jpeg', 'svg'];

  if ( validExtensions.indexOf(extension) < 0 ) {
      return res.status(400).json({
          ok: false,
          err: {
              message: 'Las extensiones permitidas son : ' + validExtensions.join(', '),
              extension
          }
      })
  }


  // Permite mover a un directorio
  myFile.mv(`uploads/${myFile.name}`, (err) => {
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