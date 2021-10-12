import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <nav id="menu">
      <ul>
        <li>
          <Link to="/">Usuarios</Link>
        </li>
        <li>
          <Link to="/tareas">Tareas</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
