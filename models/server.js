const express = require("express");
const cors = require("cors");
const { dbbConnect } = require("../database/config")
//const hbs = require('hbs');
const routerUsuarios = require('../routes/usuarios');
const routerAuth = require('../routes/auth');

require("dotenv").config();

class Server {

  constructor() {

    this.port = process.env.PORT || 5000;
    this.app = express();

    //rutas string
    this.ejemploPath = "/ejemplo"
    this.usersPath = "/usuarios"
    this.authPath = "/auth"

    //coneccion DB
    
    //midlewires globales de la APP
    this.midlewires();

    //rutas de la APP
    this.routes();
    
  }
  async conexion() {
    dbbConnect();
  }

  midlewires() {

    // definimos el cors que sirve ára definir regls en las peticiones
    this.app.use(cors());

    // lectura y parseo del body (recibe y devuelve JSON)
    this.app.use( express.json() )

    // declaramos un midleware para decir que el punto de referencia es public
    this.app.use(express.static("public"));
    
  }

  routes() {

    // rutas globales ( dentro de un path hay sub paths)
    this.app.use( this.usersPath, routerUsuarios );
    this.app.use( this.authPath, routerAuth );

  }

  listen() {

    //levantamos el servidor
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });

    //llamar a handelbars
    //app.set('view engine', 'hbs');

    //habilitar el uso de partials, componentes reutilizables 
    //hbs.registerPartials(__dirname + '/views/partials', function (err) {});
    

  }
}

module.exports = Server;
