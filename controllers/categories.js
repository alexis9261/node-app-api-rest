const { Router, response, request } = require('express');
const { Category } = require('../models');

// post
const createCategory = async(req = request, res = response) => {
    
    const title = req.body.title.toUpperCase();

    const categoryDB = await Category.findOne({ title });

    // valido si existe la categoria en BD
    if(categoryDB){
        res.status(400).json({
            data: `La categoria ${categoryDB.title} ya existe`,
        });    
    }

    // data a guardar en BD
    const data = {
        title,
        user: req.user._id
    }

    // guarda en BD
    const category = await new Category( data );

    await category.save();

    res.status(201).json(category);

}

// get categories
const getCategories = async(req = request, res = response) => {

    const { limit = 10, from = 0 } = req.query;
    const condition = {status: true}

    const [ total, categories ] = await Promise.all([
        Category.countDocuments(condition),
        Category.find(condition)
            .skip(Number(from))
            .limit(Number(limit))
            .populate('user', ['name', 'email'])
            .exec()
    ]);

    // Respondo a la peticion con un codigo(status) 200ok, y un json
    res.status(200).json({
        total,
        categories
    });
}

// get category by id
const getCategory = async(req = request, res = response) => {
    
    const { id } = req.params;
    const category = await Category.findById(id)
                            .populate('user', ['name', 'email']); 

    res.status(200).json({
        category
    });
}

// update category
const updateCategory = async(req = request, res = response) => {

    // obtengo el id enviado en la url, configurado en la ruta :id
    const { id } = req.params;
    // obtengo los campos que vienen del body de la peticion
    const { status, user, ...data } = req.body;

    data.title = data.title.toUpperCase()
    // obtengo de la requets al usuario que esta logeado, sera el que actualice la categoria
    data.user = req.user._id

    // actualizo el usuario en BD
    const category = await Category.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json(category);

}

// delete category
const deleteCategory = async(req = request, res = response) => {

    // obtengo el id enviado en la url, configurado en la ruta :id
    const { id } = req.params;

    // actualizo el usuario en BD
    const category = await Category.findByIdAndUpdate(id, { status: false });

    res.status(200).json(category);

}

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}