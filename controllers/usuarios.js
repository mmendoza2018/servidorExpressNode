const { response, request } = require("express");
const Usuario = require("../models/usuario.js");
const bcrypt = require("bcryptjs");

const getUsuarios = async (req, res = response) => {

  const { inicio = 0, limite = 5 } = req.query;
  const query = { estado: true }

  // inicio y limite de registros 
  const UsuariosPersonalizados = await Usuario.find( query )
    .skip( Number( inicio ) )
    .limit( Number( limite ) );

  // inicio y limite de registros 
  const totalUsuarios = await Usuario.countDocuments( query );

  const [ usuarios, total ] = await Promise.all([
    UsuariosPersonalizados,
    totalUsuarios
  ])

  res.json({
    total,
    usuarios
  });
};

const getUsuarioMiguel = (req, res = response) => {
  res.send("ejemplo get sub ruta usuarios");
};

const getQuerys = (req = request, res = response) => {
  //obtenemos las querys que define en la peticion
  const { nombre } = req.query;
  res.json({
    nombre,
  });
};

const postUsuarioCiudad = (req = request, res = response) => {
  //obtenemos el parametro definido en la ruta
  const { ciudad } = req.params;
  res.json({
    ciudad,
  });
};

const postUsuarios = async (req = request, res = response) => {
  //obtenemos el body de la peticion
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // encriptar contraseña
  var salt = bcrypt.genSaltSync(10);
  var newPassword = bcrypt.hashSync(password, salt);
  usuario.password = newPassword;
  await usuario.save();

  res.json({
    usuario,
  });
};

const putUsuarios = async (req = request, res = response) => {
  //recibimos el parametro de la ruta
  const { id } = req.params;

  // recibimos los campos del body,evitamos que el correo, la contraseña y el id puedan ser actualizado con facilidad 
  const { _id, password, correo, ...resto } = req.body;

  //obtenemos el body de la peticion
  if (password) {

    // encriptar contraseña
    var salt = bcrypt.genSaltSync(10);
    var newPassword = bcrypt.hashSync(password, salt);
    resto.password = newPassword;

  }
  let usuarioUpdate = await Usuario.findByIdAndUpdate( id, resto )

  res.json({
    usuarioUpdate,
  });
};


const deleteUsuarios = async (req = request, res = response) => {
  //recibimos el parametro de la ruta
  const { id } = req.params;

  //quitamos el registro fisicamente
  //let deleteUpdate = await Usuario.findByIdAndDelete( id )

  // actualizamos el estado 
  let usuarioUpdate = await Usuario.findByIdAndUpdate( id, { estado : false } )

  res.json({
    usuarioUpdate,
  });
};

module.exports = {
  getUsuarios,
  postUsuarios,
  getUsuarioMiguel,
  postUsuarioCiudad,
  getQuerys,
  putUsuarios,
  deleteUsuarios
};
