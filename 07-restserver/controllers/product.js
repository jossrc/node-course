const { request, response } = require('express');
const { Product } = require('../models');

const getProducts = async (req = request, res = response) => {
    const { since = 0, limit = 5 } = req.query;
    const filter = { state: true };

    if (isNaN(Number(since)) || isNaN(Number(limit)))
        return res.status(400).json({
            message: 'Ingrese un valor inicial y/o limite válido',
        });

    const total = await Product.countDocuments(filter);

    if (since >= total)
        return res.status(400).json({
            message: `Ingrese un valor inicial (${since}) menor al total: ${total}`,
        });

};

const getProduct = async (req = request, res = response) => {
    const { id: productId } = req.params;

};

const createProduct = async (req = request, res = response) => {

};

const updateProduct = async (req = request, res = response) => {

};

const deleteProduct = async (req = request, res = response) => {

}


module.exports = {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
};
