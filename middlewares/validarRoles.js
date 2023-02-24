const { response } = require("express");
const usuario = require("../models/usuario");

const validaRolAdministrador = (req, res = response, next) => {

  if ( !req.usuario ) {
    return res.status(500).json({
      msg:"No se valido al usuario con JWT"
    })
  }

  const { rol } = req.usuario;
  if ( rol !== "ADMIN_ROLE" ) {
    return res.status(401).json({
      msg:"EL usuario debe ser administrador"
    })
  }
  next();

}

const verificaRolesDados = ( ...roles ) => {
  
  return (req, res = response, next) => {
    
    if ( roles.length <= 0 ) {
      return res.status(500).json({
        msg:"La mideware de verificar roles necesita parametros"
      })
    }
    if ( !roles.includes( req.usuario.rol ) ) {
      return res.status(401).json({
        msg:"El usuario debe tener un rol valido"
      })
    }
    next();
  }

} 
module.exports = {
  validaRolAdministrador,
  verificaRolesDados
}