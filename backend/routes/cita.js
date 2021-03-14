const { Router } = require('express');
const { check } = require('express-validator');

const {  validarCampos } = require('../middlewares/validar-campos');

const {    crearCita,
    obtenerCitas,
    obtenerCita,
    actualizarCita,
    borrarCita } = require('../controllers/citas');

const {  existeCitaPorId , existeProfesionalSaludPorId , existePacientePorId } = require('../helpers/db-validators');

const router = Router();
router.get('/', obtenerCitas );

router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCitaPorId ),
    validarCampos,
], obtenerCita );

router.post('/', [ 
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('paciente','No es un id de Mongo').isMongoId(),
    check('paciente').custom( existePacientePorId ),
    check('profesionalSalud','No es un id de Mongo').isMongoId(),
    check('profesionalSalud').custom( existeProfesionalSaludPorId ),
    validarCampos
], crearCita );


router.put('/:id',[
    check('id').custom( existeCitaPorId ),
    validarCampos
], actualizarCita );

router.delete('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCitaPorId ),
    validarCampos,
], borrarCita);


module.exports = router;