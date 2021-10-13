import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import * as usuariosActions from "../../actions/usuariosActions";

class Usuarios extends React.Component {
  componentDidMount() {
    this.props.traerTodos();
    // const response = await axios.get(
    //   "https://jsonplaceholder.typicode.com/users"
    // );
    // this.setState({
    //   usuarios: response.data,
    // });
    // console.log(response.data);
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
  render() {
    console.log(this.props);
    return (
      <div>
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
      </div>
    );
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;
};

export default connect(mapStateToProps, usuariosActions)(Usuarios);
