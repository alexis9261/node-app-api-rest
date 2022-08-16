const { Router, response, request } = require('express');
const { Product, Category } = require('../models');

// post - create product
const createProduct = async(req = request, res = response) => {
    
    const { status, user, ...body } = req.body;

    const productDB = await Product.findOne({ title: body.title });

    // valido si existe la categoria en BD
    if(productDB){
        res.status(400).json({
            data: `El producto ${productDB.title} ya existe`,
        });    
    }

    // data a guardar en BD
    const data = {
        title: body.title.toUpperCase(),
        user: req.user._id,
        ...body
    }

    // Creo una instancia del modelo Product, que es una instancia de mongoose
    const product = new Product( data );
    
    // guarda en BD
    await product.save();

    res.status(201).json(product);

}

// get products
const getProducts = async(req = request, res = response) => {

    const { limit = 10, from = 0 } = req.query;
    const condition = {status: true}

    const [ total, products ] = await Promise.all([
        Product.countDocuments(condition),
        Product.find(condition)
            .skip(Number(from))
            .limit(Number(limit))
            .populate('user', ['name', 'email'])
            .populate('category', ['title'])
            .exec()
    ]);

    // Respondo a la peticion con un codigo(status) 200ok, y un json
    res.status(200).json({
        total,
        products
    });
}

// get product by id
const getProduct = async(req = request, res = response) => {
    
    const { id } = req.params;
    const product = await Product.findById(id)
                            .populate('user', ['name', 'email'])
                            .populate('category', ['title']);

    res.status(200).json({
        product
    });
}

// update product
const updateProduct = async(req = request, res = response) => {

    // obtengo el id enviado en la url, configurado en la ruta :id
    const { id } = req.params;
    // obtengo los campos que vienen del body de la peticion
    const { status, user, ...data } = req.body;

    if (data.title) {
        data.title = data.title.toUpperCase();
    }
    // obtengo de la requets al usuario que esta logeado, sera el que actualice la categoria
    data.user = req.user._id

    // actualizo el usuario en BD
    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json(product);

}

// delete product
const deleteProduct = async(req = request, res = response) => {

    // obtengo el id enviado en la url, configurado en la ruta :id
    const { id } = req.params;

    // actualizo el usuario en BD
    const product = await Product.findByIdAndUpdate(id, { status: false });

    res.status(200).json(product);

}

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}