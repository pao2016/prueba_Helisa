const { Router } = require('express');
const { check } = require('express-validator');

const {  validarCampos } = require('../middlewares/validar-campos');

const {   crearProfesionalSalud,
    obtenerProfesionalSalud,
    obtenerProfesionalesSalud,
    actualizarProfesionalSalud,
    borrarProfesionalSalud } = require('../controllers/profesionalSalud');

const { existeEspecialidadPorId, existeProfesionalSaludPorId } = require('../helpers/db-validators');

const router = Router();
router.get('/', obtenerProfesionalesSalud );
router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProfesionalSaludPorId ),
    validarCampos,
], obtenerProfesionalSalud );

router.post('/', [ 
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('especialidad','No es un id de Mongo').isMongoId(),
    check('especialidad').custom( existeEspecialidadPorId ),
    validarCampos
], crearProfesionalSalud );


router.put('/:id',[
    check('id').custom( existeProfesionalSaludPorId ),
    validarCampos
], actualizarProfesionalSalud );

router.delete('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProfesionalSaludPorId ),
    validarCampos,
], borrarProfesionalSalud);


module.exports = router;