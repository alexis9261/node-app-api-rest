const { Category, Role, User, Product } = require('../models');

// valida si el rol se encuentra en BD
const isValidateRole = async(rol = '') => {
    const existsRole = await Role.findOne({ rol });
    
    if(!existsRole){
        throw new Error(`El rol ${ rol } no esta registrado en BD`);
    }

    return true;
}

// verificar si el correo existe
const existsEmail = async ( email = '' ) => {

    const existsEmailDB = await User.findOne({ email });
    if (existsEmailDB) {
        throw new Error(`El email ${ email } ya esta registrado en BD`);
        // return res.status(400).json({
        //     error: 'El correo ya esta registrado'
        // });
    }

    return true;

}

// verificar si el correo existe
const existsIdUser = async ( id = '' ) => {

    const existsUserId = await User.findById(id);
    if (!existsUserId) {
        throw new Error(`El id ${ id } no esta registrado en BD`);
    }

    return true;

}

// verificar si la categoria existe
const existsIdCategory = async ( id = '' ) => {

    const existsCategoryId = await Category.findById(id);
    if (!existsCategoryId) {
        throw new Error(`El id ${ id } no esta registrado en BD`);
    }

    return true;

}

// verificar si la categoria existe
const existsIdProduct = async ( id = '' ) => {

    const existsProductId = await Product.findById(id);
    if (!existsProductId) {
        throw new Error(`El id ${ id } no esta registrado en BD`);
    }

    return true;

}

/**
 * Validar colecciones permitidas
 */
const allowedCollections = ( collection = '', collections = [] ) => {

    const includeCollection = collections.includes(collection);

    if (!includeCollection) {

        throw new Error(`La coleccion ${collection} no es permitida: ${collections}`);
        
    }

    return true;

}

module.exports = {
    isValidateRole,
    existsEmail,
    existsIdUser,
    existsIdCategory,
    existsIdProduct,
    allowedCollections
}