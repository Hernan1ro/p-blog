import {
  CARGANDO,
  ERROR,
  TRAER_TAREAS,
  CAMBIO_USUARIO_ID,
  CAMBIO_TITULO,
  AGREGADA,
} from "../types/tareasTypes";
import axios from "axios";

export const traerTareas = () => async (dispatch) => {
  dispatch({
    type: CARGANDO,
    cargando: true,
  });
  try {
    const respuesta = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    const tareas = {};
    respuesta.data.map(
      (tar) =>
        (tareas[tar.userId] = {
          ...tareas[tar.userId],
          [tar.id]: {
            ...tar,
          },
        })
    );

    dispatch({
      type: TRAER_TAREAS,
      payload: tareas,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "No se encontraron las tareas, ahora puedes holgazanear",
    });
  }
};

export const cambioUsuarioId = (usuarioId) => (dispatch) => {
  dispatch({
    type: CAMBIO_USUARIO_ID,
    payload: usuarioId,
  });
};
export const cambioTitulo = (titulo) => (dispatch) => {
  dispatch({
    type: CAMBIO_TITULO,
    payload: titulo,
  });
};

export const agregar = (nuevaTarea) => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  });
  try {
    const respuesta = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      nuevaTarea
    );
    console.log(respuesta.data);
    dispatch({
      type: AGREGADA,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Hubo un error en el envío de datos",
    });
  }
};

export const editar = (tarea_editada) => (dispatch) => {
  console.log(tarea_editada);
};
