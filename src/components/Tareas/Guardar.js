import React, { Component } from "react";
import { connect } from "react-redux";
import * as tareasActions from "../../actions/tareasActions";
import Spinner from "../general/Spinner";
import Fatal from "../general/Fatal";
import { Redirect } from "react-router-dom";

class Guardar extends Component {
  cambioUsuarioId = (event) => {
    console.log(event.target.value);
    this.props.cambioUsuarioId(event.target.value);
  };
  cambioTitulo = (event) => {
    this.props.cambioTitulo(event.target.value);
  };
  guardar = (event) => {
    const { usuario_id, titulo, agregar } = this.props;
    const nuevaTarea = {
      userId: usuario_id,
      title: titulo,
      completed: false,
    };
    agregar(nuevaTarea);
  };
  deshabilitar = () => {
    const { usuario_id, titulo, cargando } = this.props;
    if (cargando) {
      return true;
    }
    if (!usuario_id || !titulo) {
      return true;
    }
    return false;
  };
  mostrarAccion = () => {
    const { error, cargando } = this.props;
    if (cargando) {
      return <Spinner />;
    }
    if (error) {
      return <Fatal mensaje={error} />;
    }
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Guardar tarea</h1>
        usuario id:
        <input
          type="number"
          value={this.props.usuario_id}
          onChange={this.cambioUsuarioId}
        />
        <br />
        <br />
        Título:
        <input value={this.props.titulo} onChange={this.cambioTitulo} />
        <br />
        <br />
        <button onClick={this.guardar} disabled={this.deshabilitar()}>
          guardar
        </button>
        {this.mostrarAccion()}
      </div>
    );
  }
}
const mapStateToProps = ({ tareasReducer }) => {
  return tareasReducer;
};
export default connect(mapStateToProps, tareasActions)(Guardar);
