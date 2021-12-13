const express = require("express");
const cors = require('cors')

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usariosPath = '/api/usuarios';

        //middlewares
        this.middlewares();
        //rutas
        this.routes();
        //Rutas de mi aplicacion
    }

    middlewares(){
        //CORS
        this.app.use( cors() );

        //lectura y parseo del body
        this.app.use( express.json());

        //directorio publico
        this.app.use( express.static('public'));
    }
    
    routes(){
        this.app.use( this.usariosPath, require('../routes/user'));
    }

    listen(){
        
        this.app.listen(this.port, () => {
            console.log("corriendo en ", this.port )
        })
    }
}

module.exports = Server;