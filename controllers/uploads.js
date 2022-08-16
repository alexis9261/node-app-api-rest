const path = require("path");
const fs   = require("fs");
const { response }   = require("express");
const { uploadFile } = require('../helpers');
const { User, Product } = require("../models");
const { fstat } = require("fs");


const loadFiles = async (req, res = response) => {

    // try catch porque uploadFile, retorna una promesa
    // Tambien pudo haber sido .catch() 
    try {
        
        const fileName = await uploadFile(req.files, undefined, '../uploads/');
        res.json({ fileName });

    } catch (error) {
        return res.status(400).json({ error });
    }

}

// Actualiza una imagen
const updateFiles = async( req, res = response ) => {

    const { collection, id } = req.params;

    let model;

    switch (collection) {
        case 'users':

        model = await User.findById(id);
        if (!model) {
            return res.status(400).json({
                msg: `No existe un usuario con el id ${id}`
            });
        }
            
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            
            break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvido validar eso' })
    }

    // Limppiar imagenes previas
    if ( model.img ) {
        // Borrar la imagen del servidor
        const pathImage = path.join(__dirname, '../uploads/', collection, model.img)
        if( fs.existsSync( pathImage ) ) {
            fs.unlinkSync( pathImage );
        }
    }

     const nameImage = await uploadFile(req.files, undefined, '../uploads/' + collection);
     model.img = nameImage;

     model.save();


    return res.json({
        model
    });
}

// Descargar una imagen
const downloadImage = async( req, res = response ) => {

    const { collection, id } = req.params;
    const noImagePath = path.join(__dirname, '../assets/no-image.jpg');

    let model;

    switch (collection) {
        case 'users':

        model = await User.findById(id);
        if (!model) {
            console.log(`[DB] No existe un usuario con el id ${id}`);
            return res.status(400).sendFile(noImagePath);
        }
            
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                console.log(`[DB] No existe un producto con el id ${id}`);
                return res.status(400).sendFile(noImagePath);
            }
            
            break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvido validar eso' })
    }

    if ( model.img ) {
        // Borrar la imagen del servidor
        const pathImage = path.join(__dirname, '../uploads/', collection, model.img)
        if( fs.existsSync( pathImage ) ) {
            return res.status(200).sendFile(pathImage);
        }
    }

    return res.status(400).sendFile(noImagePath);
}

module.exports = {
    loadFiles,
    updateFiles,
    downloadImage
}