const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { User, Category, Product } = require("../models");

const allowedCollections = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const searchUsers = async (term = '', res = response)=> {
    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
        const user = await User.findById(term);
        return res.json({
            results: ( user ? [user] : [] )
        })
    }

    const regex = new RegExp(term, 'i');
    const users = await User.find({
        $or: [
            { name: regex },
            { email: regex}
        ],
        $and: [{ state: true }]
    });

    res.json({
        results: users
    })

}

const searchCategories = async (term = '', res = response)=> {
    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
        const category = await Category.findById(term);
        return res.json({
            results: ( category ? [category] : [] )
        })
    }

    const regex = new RegExp(term, 'i');
    const categories = await User.find({
        $and: [{ name: regex },{ state: true }]
    });

    res.json({
        results: categories
    })

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
        case 'categorias':
            searchCategories(term, res)
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
