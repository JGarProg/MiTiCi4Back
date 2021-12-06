import { InscriptionModel } from './inscripcion.js';

const resolverInscripciones = {
  Query: {
    Inscripciones: async (parent, args) => {
      const inscripciones = await InscriptionModel.find();
      return inscripciones;
    },
  },
  Mutation: {
    crearInscripcion: async (parent, args) => {
      const inscripcionCreada = await InscriptionModel.create({
        estado: args.estado,
        proyecto: args.proyecto,
        estudiante: args.estudiante,
      });
      return inscripcionCreada;
    },
    decidirInscripcion: async (parent, args) => {
      const inscripcionRevisada = await InscriptionModel.findByIdAndUpdate(
        args._id,
        {
          estado: args.estado,
          fechaIngreso: Date.now(),
        },
        { new: true }
      );
      return inscripcionRevisada;
    },
  },
};

export { resolverInscripciones };
