const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { crearEspecialidad,
    obtenerEspecialidades,
    obtenerEspecialidad,
    actualizarEspecialidad,
    borrarEspecialidad} = require('../controllers/especialidad');
const { existeEspecialidadPorId } = require('../helpers/db-validators');

const router = Router();


router.get('/', obtenerEspecialidades );

router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeEspecialidadPorId ),
    validarCampos,
], obtenerEspecialidad );


router.post('/', [ 
  
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearEspecialidad );


router.put('/:id',[
  
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeEspecialidadPorId ),
    validarCampos
],actualizarEspecialidad );


router.delete('/:id',[
 
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeEspecialidadPorId ),
    validarCampos,
],borrarEspecialidad);



module.exports = router;