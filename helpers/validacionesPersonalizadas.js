const Rol = require("../models/rol.js");
const Usuario = require("../models/usuario.js");

const validacionRolUsuarios = async (rol = '') => {
    
  const existeRol = await Rol.findOne({ rol });
  if ( !existeRol ) {
    throw new Error(`${rol} no es un rol valido`);
  }
  return true;
  
}

const validacionEmailUsuarios = async ( correo = '' ) => {

  // validar que no exista un usuario con esa email
  const existeEmail = await Usuario.findOne( { correo } )

  if (existeEmail) {
    throw new Error(`El correo ${correo} ya esta en uso`);
  }
  return true;
}


const validacionExiteIdUsuario = async ( id = '' ) => {

  // validar que no exista un usuario con esa email
  const existeId = await Usuario.findById( id )

  if ( !existeId ) {
    throw new Error(`El id: ${ id } no existe en la base de datos`);
  }
  return true;
}



module.exports = { validacionRolUsuarios, validacionEmailUsuarios, validacionExiteIdUsuario }