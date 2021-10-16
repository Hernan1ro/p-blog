import React from "react";
import { connect } from "react-redux";
import * as tareasActions from "../../actions/tareasActions";

class Tareas extends React.Component {
  componentDidMount() {
    console.log(this.props.traerTareas());
  }
  render() {
    console.log(this.props);
    return <div>Hola papu</div>;
  }
}
const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Tareas);
