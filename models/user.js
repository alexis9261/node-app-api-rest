const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// Metodo para quitar los campos '__v' y 'password' de la respuesta del modelo
// El metodo toJSON es el que se encarga de obtener los datos de cada registro en la coleccion 'users'
// Aca estamos sobreescribiendo el metodo, polimorfismo
UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();

    user.uid = _id;

    return user;
}

module.exports = model( 'User', UserSchema);