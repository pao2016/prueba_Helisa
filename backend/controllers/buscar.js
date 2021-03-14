const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const Cita = require("../models/citas");
const Paciente = require("../models/paciente");

const coleccionesPermitidas = [
  "Cita",
  "Paciente",
  "ProfesionalSalud",
  "ExamenClinico",
  "Control",
];

const buscarCita = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);

  const cita = await Cita.aggregate([
    {
      $match: {
        _id: ObjectId(termino),
      },
    },
    {
      $lookup: {
        from: "controls",
        localField: "_id",
        foreignField: "cita",
        as: "controles",
      },
    },
    {
      $lookup: {
        from: "examenclinicos",
        localField: "_id",
        foreignField: "cita",
        as: "ExamenClinico",
      },
    },
  ]);

  return res.json({
    results: cita ? [cita] : [],
  });
};

const buscarPaciente = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);

  const paciente = await Paciente.aggregate([
    {
      $match: {
        _id: ObjectId(termino),
      },
    },
    {
      $lookup: {
        from: "citas",
        localField: "_id",
        foreignField: "paciente",
        as: "citas",
      },
    },
    {
      $unwind: "$citas",
    },
    {
        $lookup: {
          from: "controls",
          localField: "citas._id",
          foreignField: "cita",
          as: "controles",
        },
      },
      {
        $lookup: {
          from: "examenclinicos",
          localField: "citas._id",
          foreignField: "cita",
          as: "examenclinicos",
        },
      }

  ]);

  return res.json({
    results: paciente ? [paciente] : [],
  });
};

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "Cita":
      buscarCita(termino, res);
      break;

      case "Paciente":
        buscarPaciente(termino, res);
        break;

    default:
      res.status(500).json({
        msg: "No existe la consulta",
      });
  }
};

module.exports = {
  buscar,
};
