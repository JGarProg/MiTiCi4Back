import { ProjectModel } from './proyecto.js';

const resolversProyecto = {
  Query: {
    Proyectos: async (parent, args) => {
      const proyectos = await ProjectModel.find()
        .populate({
          path: 'avances',
          populate: {
            path: 'creadoPor',
          },
        })
        .populate('inscripciones')
        .populate('lider');
      return proyectos;
    },
    Proyecto: async (parent, args) => {
      const proyecto = await ProjectModel.findOne({ _id: args._id })
        .populate({
          path: 'avances',
          populate: {
            path: 'creadoPor',
          },
        })
        .populate('inscripciones')
        .populate('lider');
      return proyecto;
    },
    Lideras: async (parent, args) => {
      const lideras = await ProjectModel.find({ lider: args.lider })
        .populate({
          path: 'avances',
          populate: {
            path: 'creadoPor',
          },
        })
        .populate('inscripciones')
        .populate('lider');
      return lideras;
    },
  },
  Mutation: {
    crearProyecto: async (parent, args) => {
      const proyectoCreado = await ProjectModel.create({
        nombre: args.nombre,
        estado: args.estado,
        fase: args.fase,
        fechaInicio: args.fechaInicio,
        fechaFin: args.fechaFin,
        presupuesto: args.presupuesto,
        lider: args.lider,
        objetivos: args.objetivos,
      });
      return proyectoCreado;
    },
    editarProyecto: async (parent, args) => {
      const proyectoEditado = await ProjectModel.findByIdAndUpdate(
        args._id,
        {
          nombre: args.nombre,
          estado: args.estado,
          fase: args.fase,
          fechaInicio: args.fechaInicio,
          fechaFin: args.fechaFin,
          presupuesto: args.presupuesto,
          lider: args.lider,
          objetivos: args.objetivos,
        },
        { new: true }
      );
      return proyectoEditado;
    },
    eliminarProyecto: async (parent, args) => {
      if (Object.keys(args).includes('_id')) {
        const proyectoEliminado = await ProjectModel.findOneAndDelete({ _id: args._id });
        return proyectoEliminado;
      }
    },
  },
};

export { resolversProyecto };
