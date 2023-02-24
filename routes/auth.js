const express = require("express");
const { body, param } = require("express-validator");
const router = express.Router();

const { validarCampos } = require("../middlewares/validarCampos.js");
const { login } = require("../controllers/auth");


router.post("/login", 
  body("correo").isEmail(),
  body("password").not().isEmpty(),
  validarCampos,
  login
);

module.exports = router;
