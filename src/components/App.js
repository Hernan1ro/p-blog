import React from "react";

const App = () => {
  return (
    <div className="margen">
      <table className = "tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Enlace</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Rodolfo</td>
            <td>Rodolfo@gmail.com</td>
            <td>Rodolfo.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default App;
