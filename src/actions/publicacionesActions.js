import axios from "axios";
import {
  TRAER_POR_USUARIO,
  ERROR,
  CARGANDO,
  COM_CARGANDO,
  COM_ERROR,
} from "../types/publicacionesTypes";
import * as usuariosTypes from "../types/usuariosTypes";

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes;

export const traerPorUsuario = (key) => async (dispatch, getState) => {
  dispatch({
    type: CARGANDO,
  });
  const { usuarios } = getState().usuariosReducer;
  const { publicaciones } = getState().publicacionesReducer;
  const usuario_id = usuarios[key].id;
  try {
    const respuesta = await axios.get(
      `http://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`
    );
    const nuevas = respuesta.data.map((publicacion) => ({
      ...publicacion,
      comentarios: [],
      abierto: false,
    }));

    const publicaciones_actualizadas = [...publicaciones, nuevas];

    dispatch({
      type: TRAER_POR_USUARIO,
      payload: publicaciones_actualizadas,
    });

    const publicaciones_key = publicaciones_actualizadas.length - 1;
    const usuarios_actualizados = [...usuarios];
    usuarios_actualizados[key] = {
      ...usuarios[key],
      publicaciones_key,
    };
    dispatch({
      type: USUARIOS_TRAER_TODOS,
      payload: usuarios_actualizados,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: "Publicaciones no disponibles",
    });
  }
};

export const abrirCerrar =
  (publicaciones_key, com_key) => (dispatch, getState) => {
    const { publicaciones } = getState().publicacionesReducer;
    const seleccionada = publicaciones[publicaciones_key][com_key];

    const actualizada = {
      ...seleccionada,
      abierto: !seleccionada.abierto,
    };

    const publicacionesActualizadas = [...publicaciones];
    publicacionesActualizadas[publicaciones_key] = [
      ...publicaciones[publicaciones_key],
    ];
    publicacionesActualizadas[publicaciones_key][com_key] = actualizada;

    dispatch({
      type: TRAER_POR_USUARIO,
      payload: publicacionesActualizadas,
    });
  };

export const traerComentarios =
  (publicaciones_key, com_key) => async (dispatch, getState) => {
    dispatch({
      type: COM_CARGANDO,
    });
    const { publicaciones } = getState().publicacionesReducer;
    const seleccionada = publicaciones[publicaciones_key][com_key];
    try {
      const respuesta = await axios.get(
        `https://jsonplaceholder.typicode.comm/comments?postId=${seleccionada.id}`
      );
      const actualizada = {
        ...seleccionada,
        comentarios: respuesta.data,
      };
      const publicacionesActualizadas = [...publicaciones];
      publicacionesActualizadas[publicaciones_key] = [
        ...publicaciones[publicaciones_key],
      ];
      publicacionesActualizadas[publicaciones_key][com_key] = actualizada;
      dispatch({
        type: TRAER_POR_USUARIO,
        payload: publicacionesActualizadas,
      });
    } catch (error) {
      dispatch({
        type: COM_ERROR,
        payload: "Comentarios no encontrados",
      });
    }
  };
