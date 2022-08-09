const { response, request } = require('express');
const bcript = require('bcryptjs');
const User = require('../models/user');


// get
const userGet = async(req = request, res = response) => {
    
    const { limit = 10, from = 0 } = req.query;
    const condition = {status: true}

    const [ total, users ] = await Promise.all([
        User.countDocuments(condition),
        User.find(condition)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    // Respondo a la peticion con un codigo(status) 200ok, y un json
    res.status(200).json({
        total,
        users
    });
}

// post
const userPost = async( req, res = response ) => {    

    const { name, email, password, rol } = req.body;
    const user = new User( { name, email, password, rol } );

    // encriptar la password
    const salt = bcript.genSaltSync(10);
    user.password = bcript.hashSync( password, salt );

    // guardar en BD
    await user.save();

    res.status(200).json({
       data: 'post api - controller',
       user
    });
}

// put
const userPut = async(req, res = response ) => {

    // obtengo el id enviado en la url, configurado en la ruta :id
    const { id } = req.params;
    // obtengo los campos que vienen del body de la peticion
    const { _id, password, google, email, ...resto } = req.body;

    // TODO validar contra BD
    if ( password ) {

        // encriptar la password
        const salt = bcript.genSaltSync(10);
        resto.password = bcript.hashSync( password, salt );

    }

    // actualizo el usuario en BD
    const user = await User.findByIdAndUpdate(id, resto);

    res.status(200).json(user);
}

// patch
const userPatch = (req, res = response ) => {
    res.status(200).json({
       data: 'patch api - controller' 
    });
}

// delete
const userDelete = async(req, res) => {

    // obtengo el id enviado en la url, configurado en la ruta :id
    const { id } = req.params;

    // Eliminar el registro de BD
    // const user = await User.findByIdAndDelete( id );

    // actualizo el campo status del usuario del id en BD
    const user = await User.findByIdAndUpdate(id, { status: false });

    res.status(200).json(user);
}


module.exports = {
    userGet,
    userPut,
    userPatch,
    userPost,
    userDelete
}