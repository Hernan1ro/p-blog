import React from "react";
import { connect } from "react-redux";
import * as tareasActions from "../../actions/tareasActions";
import Spinner from "../general/Spinner";
import Fatal from "../general/Fatal";
import Guardar from "./Guardar";
import { Link } from "react-router-dom";
class Tareas extends React.Component {
  componentDidMount() {
    if (!Object.keys(this.props.tareas).length) {
      this.props.traerTareas();
    }
  }
  componentDidUpdate() {
    if (!Object.keys(this.props.tareas).length) {
      this.props.traerTareas();
    }
  }
  mostrarContenido = () => {
    const { cargando, error, tareas } = this.props;
    if (cargando) {
      return <Spinner />;
    }
    if (error) {
      return <Fatal mensaje={error} />;
    }
    return Object.keys(tareas).map((usu_id) => (
      <div key={usu_id}>
        <h2>Usuario {usu_id}</h2>
        <div className="contenedor_tareas">{this.ponerTareas(usu_id)}</div>
      </div>
    ));
  };
  ponerTareas = (usu_id) => {
    const { tareas, cambioCheck, eliminar } = this.props;
    const por_usuario = {
      ...tareas[usu_id],
    };
    return Object.keys(por_usuario).map((tar_id) => (
      <div key={tar_id}>
        <input
          type="checkbox"
          defaultChecked={por_usuario[tar_id].completed}
          onChange={() => cambioCheck(usu_id, tar_id)}
        />
        {por_usuario[tar_id].title}
        <Link to={`/tareas/guardar/${usu_id}/${tar_id}`}>
          <button className="m_left">Editar</button>
        </Link>
        <button onClick={() => eliminar(tar_id)} className="m_left">
          Eliminar
        </button>
      </div>
    ));
  };
  render() {
    console.log(this.props.tareas);
    return (
      <div>
        <button>
          <Link to={"/tareas/guardar"}>Agregar</Link>
        </button>
        {this.mostrarContenido()}
      </div>
    );
  }
}
const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Tareas);
