const {request, response} = require('express');

const search = (req = request, res = response) => {

    const { collection, term } = req.params;

    res.json({
        message: 'Buscar',
        collection,
        term
    });
}

module.exports = {
    search
}
