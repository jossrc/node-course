const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { User } = require("../models");

const allowedCollections = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
];

const searchUsers = async (term = '', res = response)=> {
    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
        const user = await User.findById(term);
        res.json({
            results: ( user ? [user] : [] )
        })
    }

}

const search = (req = request, res = response) => {

    const {collection, term} = req.params;

    if (!allowedCollections.includes(collection))
        return res.status(400).json({
            message: `Las colecciones permitidas son: ${allowedCollections}`
        })

    switch (collection) {
        case 'usuarios':
            searchUsers(term, res)
            break;
        case 'categoria':
            break;
        case 'productos':
            break;
        default:
            res.status(500).json({
                message: 'Esta búsqueda no se encuentra disponible'
            })
    }

}

module.exports = {
    search
}
