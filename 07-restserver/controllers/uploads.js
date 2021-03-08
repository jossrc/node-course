const { request, response } = require('express');

const uploadFiles = (req = request, res = response) => {

    res.json({
        message: 'Archivo cargado correctamente'
    })

}

module.exports = {
    uploadFiles
}
