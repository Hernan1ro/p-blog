import React, { Component } from "react";
import { connect } from "react-redux";
import * as tareasActions from "../../actions/tareasActions";
import Spinner from "../general/Spinner";
import Fatal from "../general/Fatal";
import { Redirect } from "react-router-dom";

class Guardar extends Component {
  componentDidMount() {
    const {
      match: {
        params: { usu_id, tar_id },
      },
      tareas,
      cambioUsuarioId,
      cambioTitulo,
      limpiarForma,
    } = this.props;
    if (usu_id && tar_id) {
      const tarea = tareas[usu_id][tar_id];
      cambioUsuarioId(tarea.userId);
      cambioTitulo(tarea.title);
    } else {
      limpiarForma();
    }
  }
  cambioUsuarioId = (event) => {
    this.props.cambioUsuarioId(event.target.value);
  };
  cambioTitulo = (event) => {
    this.props.cambioTitulo(event.target.value);
  };
  guardar = () => {
    const {
      usuario_id,
      titulo,
      agregar,
      tareas,
      editar,
      match: {
        params: { usu_id, tar_id },
      },
    } = this.props;

    const nuevaTarea = {
      userId: usuario_id,
      title: titulo,
      completed: false,
    };

    if (usu_id && tar_id) {
      const tarea = tareas[usu_id][tar_id];
      const tarea_editada = {
        ...nuevaTarea,
        completed: tarea.completed,
        id: tarea.id,
      };
      editar(tarea_editada);
    } else {
      agregar(nuevaTarea);
    }
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
    return (
      <div>
        {this.props.regresar ? <Redirect to="/tareas" /> : ""}
        <h1>Guardar tarea</h1>
        usuario id:
        <input
          type="number"
          value={this.props.usuario_id}
          onChange={this.cambioUsuarioId}
        />
        <br />
        <br />
        T??tulo:
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
