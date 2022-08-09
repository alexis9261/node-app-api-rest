const mongoose = require('mongoose')

const dbConection = async() => {

    try {

        // Me conecto a la BD
        await mongoose.connect( process.env.MONGODBATLAS);

        console.log('Base de datos online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al momento de conectar con la base de datos');
    }

}

module.exports = {
    dbConection
}