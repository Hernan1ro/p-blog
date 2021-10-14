import React from "react";
import { connect } from "react-redux";
import Fatal from "../general/Fatal";
import Tabla from "../Usuarios/Tabla";
import Spinner from "../general/Spinner";
import * as usuariosActions from "../../actions/usuariosActions";

class Usuarios extends React.Component {
  componentDidMount() {
    this.props.traerTodos();
  }
  renderTable() {
    if (this.props.cargando) {
      return <Spinner />;
    }
    if (this.props.error) {
      return <Fatal mensaje={this.props.error} />;
    }
    return <Tabla />;
  }
  render() {
    return (
      <div className="list-container">
        <h1>Usuarios</h1>
        {this.renderTable()}
      </div>
    );
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;
};

export default connect(mapStateToProps, usuariosActions)(Usuarios);
