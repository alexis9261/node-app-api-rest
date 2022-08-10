const { response, json } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // Verificarsi el email existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'El usuario no existe'
            });
        }

        // Si el usuario esta activo 
        if (!user.status) {
            return res.status(400).json({
                message: 'El usuario no existe - status: inactive'
            });
        }

        // verificar la password
        const validPassword = bcryptjs.compareSync( password, user.password);
        if (!validPassword) {

            return res.status(400).json({
                message: 'El password no es correcto'
            });
            
        }

        // generar el JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })
        
    } catch (error) {
        return res.json({
            error: 'Algo salio mal con la autenticacion'
        })
    }
    
}


const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body;

    try {
        
        const { name, picture, email } = await googleVerify( id_token );

        // veriicar si el correo exste en BD
        let user = await User.findOne({email});

        if (!user) {
            // tengo q crear el usuario
            const data = {
                name,
                email,
                password: ':P',
                img: picture,
                google: true,
                rol: 'USER_ROLE'
            };
            
            // creo una instancia del modelo User, modelo de mongoose
            user = new User( data );

            // guardo en BD
            const saver = await user.save();
            
        }

        // si el usuario tiene status: false
        if (!user.status) {
            return res.status(401).json({
                message: 'El usuario esta inactivo, consulte a soporte'
            });            
        }

        // generar el JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });

    } catch (error) {
        res.status(400).json({
            error: 'El token no se puedo verificar'
        })
    }

}

module.exports = {
    login,
    googleSignIn
}