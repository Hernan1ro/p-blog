import { CARGANDO, ERROR, TRAER_TAREAS } from "../types/tareasTypes";
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
