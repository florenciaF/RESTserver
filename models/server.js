const express = require("express");
const cors = require('cors');
const { dbConnection } = require("../database/config");

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usariosPath = '/api/usuarios';

        //conectar a la base de datos
        this.conectarDb();

        //middlewares
        this.middlewares();
        //rutas
        this.routes();
        //Rutas de mi aplicacion
    }

    //base de datos
    async conectarDb(){
        await dbConnection();
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