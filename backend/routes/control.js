const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const {
    crearControl,
    obtenerControles,
    obtenerControl,
    actualizarControl,
    borrarControl
} = require("../controllers/control");

const { controlPorId , existeCitaPorId } = require("../helpers/db-validators");

const router = Router();
router.get("/",   obtenerControles);

router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(controlPorId),
    validarCampos,
  ],
  obtenerControl
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("cita", "No es un id de Mongo").isMongoId(),
    check("cita").custom(existeCitaPorId),
    validarCampos,
  ],
  crearControl
);

router.put(
  "/:id",
  [check("id").custom(controlPorId), validarCampos],
  actualizarControl
);

router.delete(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(controlPorId),
    validarCampos,
  ],
  borrarControl
);

module.exports = router;