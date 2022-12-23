const { response, request } = require("express")

const getUsuarios = (req, res = response) => {

  res.send("ejemplo get usuarios");

}

const getUsuarioMiguel = (req, res = response) => {

  res.send("ejemplo get sub ruta usuarios");

}

const getQuerys = (req = request, res = response) => {

//obtenemos las querys que define en la peticion 
  const { nombre } = req.query;
  res.json({
    nombre
  });

}

const postUsuarioCiudad = (req = request, res = response) => {

  //obtenemos el parametro definido en la ruta
  const { ciudad } = req.params;
  res.json({
    ciudad
  });

}


const postUsuarios = (req = request, res = response) => {

  //obtenemos el bady de la peticion
  const { nombre, edad } = req.body;
  res.json({
    method: "post22 desde el controlador2dd",
    nombre,
    edad
  });

}


module.exports = {
  getUsuarios,
  postUsuarios,
  getUsuarioMiguel,
  postUsuarioCiudad,
  getQuerys
} 