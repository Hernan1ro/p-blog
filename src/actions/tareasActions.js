import {
  CARGANDO,
  ERROR,
  TRAER_TAREAS,
  CAMBIO_USUARIO_ID,
  CAMBIO_TITULO,
  GUARDAR,
  ACTUALIZAR,
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
      type: GUARDAR,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Hubo un error en el envío de datos",
    });
  }
};

export const editar = (tarea_editada) => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  });
  try {
    const respuesta = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`,
      tarea_editada
    );
    dispatch({
      type: GUARDAR,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "La habeis Liado cuando intentaste guardar",
    });
  }
};
export const cambioCheck = (usu_id, tar_id) => (dispatch, getState) => {
  const { tareas } = getState().tareasReducer;
  const seleccionada = tareas[usu_id][tar_id];
  const actualizadas = {
    ...tareas,
  };
  actualizadas[usu_id] = {
    ...tareas[usu_id],
  };
  actualizadas[usu_id][tar_id] = {
    ...tareas[usu_id][tar_id],
    completed: !seleccionada.completed,
  };
  dispatch({
    type: ACTUALIZAR,
    payload: actualizadas,
  });
};
