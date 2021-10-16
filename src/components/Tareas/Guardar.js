import React, { Component } from "react";

export default class Guardar extends Component {
  render() {
    return (
      <div>
        <h1>Guardar tarea</h1>
        usuario id:
        <input type="number" />
        <br />
        <br />
        Título:
        <input />
        <br />
        <br />
        <button>guardar</button>
      </div>
    );
  }
}
