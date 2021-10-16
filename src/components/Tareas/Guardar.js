import React, { Component } from "react";
import { connect } from "react-redux";
import * as tareasActions from "../../actions/tareasActions";

class Guardar extends Component {
  cambioUsuarioId = (event) => {
    console.log(event.target.value);
    this.props.cambioUsuarioId(event.target.value);
  };
  cambioTitulo = (event) => {
    this.props.cambioTitulo(event.target.value);
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
        <button>guardar</button>
      </div>
    );
  }
}
const mapStateToProps = ({ tareasReducer }) => {
  return tareasReducer;
};
export default connect(mapStateToProps, tareasActions)(Guardar);
