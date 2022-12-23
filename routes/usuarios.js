const express = require("express");
const router = express.Router();
const { getUsuarios, postUsuarios, getUsuarioMiguel, postUsuarioCiudad, getQuerys } = require("../controllers/usuarios");

// todas estas rutas pertencen a solo un path en espcifico en este caso a usuarios, este arquivo se requiere en el server 
// se pueden hacer peticiones, put, patch, get, post, delete

router.get("/", getUsuarios);

//para pasara querys por la url
router.get("/query", getQuerys);

// para phat en especifico
router.get("/especifico", getUsuarioMiguel );

//para usar parametros en la url dinamicos
router.post("/:ciudad", postUsuarioCiudad );

router.post("/", postUsuarios);

module.exports = router;
