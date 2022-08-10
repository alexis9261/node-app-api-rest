const { response, request, json } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async(  req = request, res = response, next ) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            error: 'No hay token en la peticion'
        });
    }

    try { 

        const { uid } = jwt.verify( token, process.env.SECRET_KEY_JWT );

        // obtenemos el usuario correspondiente al uid, usuario autenticado via jwt
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                error: 'Token no valido - usuario no existe em DB'
            });
        }
        
        // verificar si el user del uid esta con status true o false
        if (!user.status) {
            return res.status(401).json({
                error: 'Token no valido - usuario inactivo'
            });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            error: 'Token no valido'
        })
    }
}

module.exports = {
    validateJWT
}