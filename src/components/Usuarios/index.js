import React from "react";
import { connect } from "react-redux";
import Fatal from "../general/Fatal";
import Spinner from "../general/Spinner";
import * as usuariosActions from "../../actions/usuariosActions";

class Usuarios extends React.Component {
  componentDidMount() {
    this.props.traerTodos();
  }
  renderList() {
    return this.props.usuarios.map((user) => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.website}</td>
      </tr>
    ));
  }
  renderTable() {
    if (this.props.cargando) {
      return <Spinner />;
    }
    if (this.props.error) {
      return <Fatal mensaje = {this.props.error} />;
    }
    return (
      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Enlace</th>
          </tr>
        </thead>
        <tbody>{this.renderList()}</tbody>
      </table>
    );
  }
  render() {
    return <div className="list-container">{this.renderTable()}</div>;
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;
};

export default connect(mapStateToProps, usuariosActions)(Usuarios);
