const { Schema, model } = require('mongoose')

const RoleSchema = Schema({
    role: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});

// Aca exportamos la clase del modelo
// Al mismo tiempo definimos cual sera la 'coleccion' de mongoDB que va a usar
// model( 'Collection_name', ModelName);
// Con este metodo, propio de mongoose, se enlazan la coleccion con el modelo
module.exports = model( 'Role', RoleSchema);