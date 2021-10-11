import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = [
      {
        name: "Lina campo",
        email: "linuxcampo@gmail.com",
        link: "lina.com",
      },
      {
        name: "Hernán Mercado",
        email: "hernandmf@gmail.com",
        link: "hernan.com",
      },
    ];
  }
  render() {
    return (
      <div className="margen">
        <table className="tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Enlace</th>
            </tr>
          </thead>
          <tbody>
            {this.state.map((user) => (
              <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.link}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
