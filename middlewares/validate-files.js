const { response } = require("express")

// Valida si viene el archivo en la peticion
// Los parametros los recibe automaticamente al ser llamada la funcion en la ruta
// no es necesario enviarle los parametros, pero si es necesario recibirlos
const fileExists = (req, res = response, next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
        return res.status(400).json({
            msg: 'No hay archivos en la petcicion'
        });
    }

    next();
}


module.exports = {
    fileExists
}

