const express = require('express')
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {
    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.authPath  = '/api/auth';

        // conectar a base de datos
        this.conectarDB();

        // middlewares
        this.middlewares();

        // Rutas de la app
        this.routes();
    }

    async conectarDB() {
        await dbConection();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // Parseo y lectura del body
        // express.json() intensta serializar cualquier informacion que venga
        // en la peticion http. Esta informacion es enviada en el body de la peticion
        this.app.use( express.json() )

        // Directorio 'public'
        this.app.use( express.static('public') )
    }

    routes() {

        // Al configurar esto, estoy usando todos los metodos que se encuentran en el archivo '/routes/users'
        // En este archivo tengo el router de nodeJs, donde estoy contruyendo todas las rutas concernientes al endpoint '/api/users'
        // Si quisiera otro conjunto de endpoints, tendria q crear otro archivo para otros endpoints, EJ: '/routes/products' para los endpoints de '/api/products'
        this.app.use( this.usersPath, require('../routes/users') );
        this.app.use( this.authPath, require('../routes/auth') );

        // get
        // router.get('/api', (req, res) => {
        //     res.status(200).json({
        //     data: 'informacion' 
        //     });
        // });
    }

    listen() {
        this.app.listen( this.port,() => {
            console.log(`App corriendo en el server ${this.port}`)
        });
    }
}


module.exports = Server;