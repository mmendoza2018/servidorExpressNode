const express = require("express");
const { body, param } = require("express-validator");
const router = express.Router();
const {
  getUsuarios,
  deleteUsuarios,
  postUsuarios,
  getUsuarioMiguel,
  postUsuarioCiudad,
  getQuerys,
  putUsuarios,
} = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validarCampos.js");
const {
  validacionRolUsuarios,
  validacionEmailUsuarios,
  validacionExiteIdUsuario
} = require("../helpers/validacionesPersonalizadas.js");

// todas estas rutas pertencen a solo un path en espcifico en este caso a usuarios, este arquivo se requiere en el server
// se pueden hacer peticiones, put, patch, get, post, delete



//para pasara querys por la url
router.get("/query", getQuerys);

// para phat en especifico
router.get("/especifico", getUsuarioMiguel);

//para usar parametros en la url dinamicos
router.post("/:ciudad", postUsuarioCiudad);

router.post(
  "/",
  //doble validacion
  body("correo")
    .isLength({ min: 5 })
    .withMessage("la longitud minima es 5")
    .isEmail()
    .withMessage("no es un correo valido"),
  body("correo").custom(validacionEmailUsuarios),
  body("edad").isNumeric(),
  body("nombre").not().isEmpty(),
  // el primer parametro del custom, pasa automaticamnete a la segunda funcion
  //body("rol").custom( rol => validacionRolUsuarios ),
  body("rol").custom(validacionRolUsuarios),
  validarCampos,
  postUsuarios
);

router.put("/:id", 
param("id", "el Id no es valido").isMongoId(),
param("id").custom( validacionExiteIdUsuario ),
body("rol").custom(validacionRolUsuarios),
validarCampos,
putUsuarios);

router.get("/", getUsuarios);
router.delete("/:id", 
param("id", "el Id no es valido").isMongoId(),
param("id").custom( validacionExiteIdUsuario ),
validarCampos,
 deleteUsuarios);

module.exports = router;
