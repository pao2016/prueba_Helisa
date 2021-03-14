const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.paths = {
          
            usuarios:   '/api/usuarios',
            especialidad:   '/api/especialidad',
            profesionalSalud: '/api/profesionalSalud',
            paciente: '/api/paciente',
            cita: '/api/cita',
            examenClinico: '/api/examenClinico',
            control: '/api/control'
        }


        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        
      
        this.app.use( this.paths.usuarios, require('../routes/usuarios'));
        this.app.use( this.paths.especialidad, require('../routes/especialidad'));
        this.app.use( this.paths.profesionalSalud, require('../routes/profesionalSalud'));
        this.app.use( this.paths.paciente, require('../routes/paciente'));
        this.app.use( this.paths.cita, require('../routes/cita'));
        this.app.use( this.paths.examenClinico, require('../routes/examenClinico'));
        this.app.use( this.paths.control, require('../routes/control'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
