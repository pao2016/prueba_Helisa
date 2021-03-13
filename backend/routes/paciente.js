const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {  crearPaciente,
    actualizarPaciente,
    borrarPaciente,
    obtenerPaciente,
    obtenerPacientes} = require('../controllers/paciente');
const { existePacientePorId } = require('../helpers/db-validators');

const router = Router();


router.get('/', obtenerPacientes );

router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existePacientePorId ),
    validarCampos,
], obtenerPaciente );


router.post('/', [ 
  
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearPaciente );


router.put('/:id',[
  
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existePacientePorId ),
    validarCampos
],actualizarPaciente );


router.delete('/:id',[
 
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existePacientePorId ),
    validarCampos,
],borrarPaciente);



module.exports = router;