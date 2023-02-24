const { response, request } = require("express");
const Usuario = require("../models/usuario.js");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/generarJWT.js");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    
    // validar si existe el email
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "El usuario | contraseña son incorrectos-user",
      });
    }
  
    // validar si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "El usuario no esta activo",
      });
    }
  
    // validar si la contraseña es correcta
  
    const validoPassword = bcrypt.compareSync(password, usuario.password);
    if (!validoPassword) {
      return res.status(400).json({
        msg: "El usuario | contraseña son incorrectos-contra",
      });
    }
  
    // validar si el usuario esta activo
    const JWT = await generarJWT( usuario.id );
  
    res.json({
      usuario,
      JWT
    });

  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      msg: "Ocurrio un error"
    })
    
  }
};

module.exports = {
  login,
};
