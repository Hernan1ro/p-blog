import axios from "axios";

export const traerTodos = () => async (dispatch) => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  console.log(response.data);
  dispatch({
    type: "traer_usuarios",
    payload: response.data,
  });
};
