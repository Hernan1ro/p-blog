import React from "react";
import { connect } from "react-redux";
import * as usuariosActions from "../../actions/usuariosActions";
import * as publicacionesActions from "../../actions/publicacionesActions";
import Spinner from "../general/Spinner";
import Fatal from "../general/Fatal";

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { traerPorUsuario: traerPorUsuario } = publicacionesActions;

class Publicaciones extends React.Component {
  async componentDidMount() {
    const {
      usuariosTraerTodos,
      traerPorUsuario,
      match: {
        params: { key },
      },
    } = this.props;
    if (!this.props.usuariosReducer.usuarios.length) {
      await usuariosTraerTodos();
    }
    if (this.props.usuariosReducer.error) {
      return;
    }
    if (!("publicaciones_key" in this.props.usuariosReducer.usuarios[key])) {
      traerPorUsuario(key);
    }
  }
  ponerUsuario = () => {
    const {
      usuariosReducer,
      match: {
        params: { key },
      },
    } = this.props;
    if (usuariosReducer.error) {
      return <Fatal mensaje={usuariosReducer.error} />;
    }
    if (!usuariosReducer.usuarios.length || usuariosReducer.cargando) {
      return <Spinner />;
    }
    const nombre = usuariosReducer.usuarios[key].name;

    return <h1>Publicaciones de {nombre}</h1>;
  };

  ponerPublicaciones = () => {
    const {
      usuariosReducer,
      usuariosReducer: { usuarios },
      publicacionesReducer,
      publicacionesReducer: { publicaciones },
      match: {
        params: { key },
      },
    } = this.props;

    if (!usuarios.length) return;
    if (usuariosReducer.error) return;
    if (publicacionesReducer.cargando) {
      return <Spinner />;
    }
    if (publicacionesReducer.error) {
      return <Fatal mensaje={publicacionesReducer.error} />;
    }
    if (!publicaciones.length) return;
    if (!("publicaciones_key" in usuarios[key])) return;

    const { publicaciones_key } = usuarios[key];
    return publicaciones[publicaciones_key].map((publicacion) => (
      <div
        key={publicacion.id}
        className="pub_titulo"
        onClick={() => alert(publicacion.id)}
      >
        <h2>{publicacion.title}</h2>
        <h3>{publicacion.body}</h3>
        <hr />
      </div>
    ));
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <div>
          {this.props.match.params.key}
          {this.ponerUsuario()}
          {this.ponerPublicaciones()}
        </div>
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
