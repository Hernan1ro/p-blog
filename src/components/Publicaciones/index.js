import React from "react";
import { connect } from "react-redux";
import * as usuariosActions from "../../actions/usuariosActions";

class Publicaciones extends React.Component {
  componentDidMount() {
    console.log(this.props.usuarios);
    this.props.traerTodos();
    console.log(this.props.usuarios);
    if (!this.props.usuarios) {
      console.log(this.props.traerTodos());
    }
  }
  render() {
    return (
      <div>
        <h1>Publicaciones de</h1>
        <div>{this.props.match.params.key}</div>
      </div>
    );
  }
}
const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;
};
export default connect(mapStateToProps, usuariosActions)(Publicaciones);
