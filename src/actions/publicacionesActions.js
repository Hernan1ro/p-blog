import axios from "axios";
import { TRAER_TODOS, ERROR, CARGANDO } from "../types/publicacionesTypes";

export const traerTodos = () => async (dispatch) => {
  try {
    dispatch({
      type: CARGANDO,
    });
    const response = await axios.get(
      "http://jsonplaceholder.typicode.com/posts"
    );
    dispatch({
      type: TRAER_TODOS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Se quemó el servidor, busca una biblia",
    });
  }
};

export const traerPorUsuario = (key) => async (dispatch, getState) => {
  const { usuarios } = getState().usuariosReducer;
  const usuario_id = usuarios[key].id;

  const respuesta = await axios.get(
    `http://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`
  );
  dispatch({
    type: TRAER_TODOS,
    payload: respuesta.data,
  });
};
