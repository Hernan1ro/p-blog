import React from "react";
import { connect } from "react-redux";

const Tabla = (props) => {
  console.log(props.usuarios);
  function renderList() {
    return props.usuarios.map((user) => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.website}</td>
      </tr>
    ));
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
      <tbody>{renderList()}</tbody>
    </table>
  );
};

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;
};

export default connect(mapStateToProps)(Tabla);
