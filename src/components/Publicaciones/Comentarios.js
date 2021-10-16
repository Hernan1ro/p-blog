import React from "react";
import { connect } from "react-redux";
import Spinner from "../general/Spinner";
import Fatal from "../general/Fatal";

const Comentarios = (props) => {
  if (props.com_error) {
    return <Fatal mensaje={props.errorMensaje} />;
  }
  if (props.com_cargando && !props.comentarios.length) {
    return <Spinner />;
  }
  const ponerComentarios = () =>
    props.comentarios.map((comentario) => (
      <li key={comentario.id}>
        <b>
          <u>{comentario.email}</u>
        </b>
        <br />
        <b>{comentario.body}</b>
      </li>
    ));
  return <ul>{ponerComentarios()}</ul>;
};
const mapStateToProps = ({ publicacionesReducer }) => {
  return publicacionesReducer;
};
export default connect(mapStateToProps)(Comentarios);
