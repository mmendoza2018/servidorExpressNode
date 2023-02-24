const { response, request } = require('express');
const jwt = require("jsonwebtoken");
const Usuario = require('../models/usuario');

const verificaJWT = async (req = request, res = response, next) => {
  const token  = req.header("x-token");

  if ( !token ) {
      return res.status(401).json({
        msg:"No existe token"
      });
  }
  try {
    // generar un trow error si no valida
    const { uid } = jwt.verify(token, process.env.JWT_PASSWORD);
    const usuario = await Usuario.findById( uid )

    // verficamos que exista un usuario con ese UID
    if ( !usuario ) {
      return res.status(401).json({
        msg:"Token no valido-no existe"
      });
    }

    // verficamos que el usuario este activo
    if ( !usuario.estado ) {
      return res.status(401).json({
        msg:"Token no valido-estado"
      });
    }

    req.usuario = usuario;

  } catch (error) {
    console.log('error :>> ', error);
    return res.status(401).json({
      msg:"Token no valido-general"
    });
  }

  next();
}

module.exports = { verificaJWT };