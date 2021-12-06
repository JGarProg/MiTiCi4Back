import { gql } from 'apollo-server-express';

const tiposProyecto = gql`
  type Objetivo {
    _id: ID!
    descripcion: String!
    tipo: Enum_TipoObjetivo!
  }

  input crearObjetivo {
    descripcion: String!
    tipo: Enum_TipoObjetivo!
  }

  type Proyecto {
    _id: ID!
    nombre: String!
    presupuesto: Float!
    fechaInicio: Date!
    fechaFin: Date!
    estado: Enum_EstadoProyecto!
    fase: Enum_FaseProyecto!
    lider: Usuario!
    objetivos: [Objetivo]
    avances: [Avance]
    inscripciones: [Inscripcion]
  }
  type Lideras {
    lider: Usuario!
    _id: ID!
  }

  type Query {
    Proyectos: [Proyecto]
    Lideras(lider: String!): [Proyecto]
    Proyecto(_id: String!): Proyecto
  }

  type Mutation {
    crearProyecto(
      nombre: String!
      presupuesto: Float!
      fechaInicio: Date!
      fechaFin: Date!
      estado: Enum_EstadoProyecto!
      fase: Enum_FaseProyecto!
      lider: String!
      objetivos: [crearObjetivo]
    ): Proyecto

    editarProyecto(
      _id: String!
      nombre: String!
      presupuesto: Float!
      fechaInicio: Date
      fechaFin: Date
      estado: Enum_EstadoProyecto!
      fase: Enum_FaseProyecto!
      lider: String
      objetivos: [crearObjetivo]
    ): Proyecto

    eliminarProyecto(_id: String): Proyecto
  }
`;

export { tiposProyecto };
