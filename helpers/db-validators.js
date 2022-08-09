const Role = require('../models/role');
const User = require('../models/user');

// valida si el rol se encuentra en BD
const isValidateRole = async(rol = '') => {
    const existsRole = await Role.findOne({ rol });
    console.log(existsRole)
    if(!existsRole){
        throw new Error(`El rol ${ rol } no esta registrado en BD`);
    }
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

}

// verificar si el correo existe
const existsIdUser = async ( id = '' ) => {

    const existsUserId = await User.findById(id);
    if (!existsUserId) {
        throw new Error(`El id ${ id } no esta registrado en BD`);
    }

}

module.exports = {
    isValidateRole,
    existsEmail,
    existsIdUser
}