import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Usuarios from "./Usuarios";
import Menu from "./Menu";

const App = () => {
  const Tareas = () => <div>Tareas</div>;
  return (
    <BrowserRouter>
      <Menu />
      <Route exact path="/" component={Usuarios} />
      <Route exact path="/tareas" component={Tareas} />
    </BrowserRouter>
  );
};

export default App;
