const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const {
  crearExamenClinico,
  obtenerExamenesClinico,
  obtenerExamenClinico,
  actualizarExamenClinico,
  borrarExamenClinico,
} = require("../controllers/examenClinico");

const { examenControlPorId , existeCitaPorId } = require("../helpers/db-validators");

const router = Router();
router.get("/",   obtenerExamenesClinico);

router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(examenControlPorId),
    validarCampos,
  ],
  obtenerExamenClinico
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("cita", "No es un id de Mongo").isMongoId(),
    check("cita").custom(existeCitaPorId),
    validarCampos,
  ],
  crearExamenClinico
);

router.put(
  "/:id",
  [check("id").custom(examenControlPorId), validarCampos],
  actualizarExamenClinico
);

router.delete(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(examenControlPorId),
    validarCampos,
  ],
  borrarExamenClinico
);

module.exports = router;
