import React from "react";
import { connect } from "react-redux";
import * as usuariosActions from "../../actions/usuariosActions";
import * as publicacionesActions from "../../actions/publicacionesActions";
const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { traerPorUsuario: traerPorUsuario } = publicacionesActions;

class Publicaciones extends React.Component {
  async componentDidMount() {
    if (!this.props.usuariosReducer.usuarios.length) {
      await this.props.usuariosTraerTodos();
    }
    this.props.traerPorUsuario(this.props.match.params.key);
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Publicaciones de</h1>
        <div>{this.props.match.params.key}</div>
      </div>
    );
  }
}
const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
  return {
    usuariosReducer,
    publicacionesReducer,
  };
};
const mapDispatchToProps = {
  usuariosTraerTodos,
  traerPorUsuario,
};
export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
