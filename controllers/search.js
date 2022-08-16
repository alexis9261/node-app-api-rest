const { response } = require('express');
const { User, Category, Product } = require('../models');
const { ObjectId } = require('mongoose').Types;

const allowedCollections = [
    'users',
    'categories',
    'products',
    'roles'
];

const searchUsers = async(term = '', res = response) => {

    const isMongoID = ObjectId.isValid( term );

    if (isMongoID) {
        const user = await User.findById(term);
        return res.json({
            results: (user) ? [ user ] : []
        });
    }

    // creamos una expresion regular que nos indica que sera insensible a mayusculas o minusculas
    // RegExp viene dierectamente con node
    const regex = new RegExp( term, 'i' );

    // Busqueda en BD, si cumple una u otra condicion
    const users = await User.find({ 
        $or: [{name: regex}, {email: regex}],
        $and: [{status: true}]
    });

    // Busqueda en BD, si cumple una u otra condicion
    const totalUsers = await User.count({ 
        $or: [{name: regex}, {email: regex}],
        $and: [{status: true}]
    });
    
    res.json({
        results: users,
        total: totalUsers
    });

}

const searchCategories = async(term = '', res = response) => {

    const isMongoID = ObjectId.isValid( term );

    if (isMongoID) {
        const category = await Category.findById(term);
        return res.json({
            results: (category) ? [ category ] : []
        });
    }

    // creamos una expresion regular que nos indica que sera insensible a mayusculas o minusculas
    // RegExp viene dierectamente con node
    const regex = new RegExp( term, 'i' );

    // Busqueda en BD, si cumple una u otra condicion
    const categories = await Category.find({
        $and: [{title: regex}, {status: true}]
    });

    // Busqueda en BD, si cumple una u otra condicion
    const totalCategories = await Category.count({
        $and: [{title: regex}, {status: true}]
    });
    
    res.json({
        results: categories,
        total: totalCategories
    });

}

const searchProducts = async(term = '', res = response) => {

    const isMongoID = ObjectId.isValid( term );

    if (isMongoID) {
        const product = await Product.findById(term)
                                .populate('category', 'title')
                                .exec();
        return res.json({
            results: (product) ? [ product ] : []
        });
    }

    // creamos una expresion regular que nos indica que sera insensible a mayusculas o minusculas
    // RegExp viene dierectamente con node
    const regex = new RegExp( term, 'i' );

    // Busqueda en BD, si cumple una u otra condicion
    const products = await Product.find({ title: regex, status: true })
                                .populate('category', 'title')
                                .exec();

    // Busqueda en BD, si cumple una u otra condicion
    const totalProducts = await Product.count({ title: regex, status: true })
    
    res.json({
        results: products,
        total: totalProducts
    });

}

const search = (req, res = response ) => {

    const { collection, term } = req.params;

    if( !allowedCollections.includes(collection) ){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${allowedCollections}`
        })
    }

    switch (collection) {
        case 'users':
            searchUsers(term, res);
            break;
        case 'categories':
            searchCategories(term, res);
            break;
        case 'products':
            searchProducts(term, res);
            break;
        case 'roles':

            break;
        
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            })
            break;
    }

}

module.exports = {
    search
}