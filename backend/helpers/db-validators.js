const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Especialidad = require('../models/especialidad');
const ProfesionalSalud = require('../models/profesionalSalud');
const Paciente = require('../models/paciente');
const Cita = require('../models/paciente');
const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const emailExiste = async( correo = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

const existeUsuarioPorId = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const existeEspecialidadPorId = async( id ) => {

    const existeEspecialidad = await Especialidad.findById(id);
    if ( !existeEspecialidad ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const existeProfesionalSaludPorId = async( id ) => {

    const existeProfesionalSalud = await ProfesionalSalud.findById(id);
    if ( !existeProfesionalSalud ) {
        throw new Error(`El id no existe ${ id }`);
    }
}


const existePacientePorId = async( id ) => {

    const existePaciente = await Paciente.findById(id);
    if ( !existePaciente ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const existeCitaPorId = async( id ) => {

    const existeCita = await Cita.findById(id);
    if ( !existeCita ) {
        throw new Error(`El id no existe ${ id }`);
    }
}




module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeEspecialidadPorId,
    existeProfesionalSaludPorId,
    existePacientePorId,
    existeCitaPorId
}

