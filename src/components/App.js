import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Usuarios from "./Usuarios";
import Menu from "./Menu";

const App = () => {
  const Tareas = () => <div>Tareas</div>;
  return (
    <BrowserRouter>
      <Menu />
      <div className="margen">
        <Route exact path="/" component={Usuarios} />
        <Route exact path="/tareas" component={Tareas} />
      </div>
    </BrowserRouter>
  );
};

export default App;
