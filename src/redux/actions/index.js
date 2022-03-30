import axios from "axios";

import {
  GET_PRODUCTOS,
  AGREGAR_CARRITO,
  ELIMINAR_CARRITO,
  ELIMINAR_TODO_CARRITO
} from "./actionsTypes";

export const getProducts = () => {
  return (dispatch) => {
    axios
      .get("https://ait-tesapi.herokuapp.com/products")
      .then((data) => {
        dispatch({
          type: GET_PRODUCTOS,
          payload: data.data.products,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const agregarCarrito = (producto) => {
  return (dispatch) => {
    dispatch({
      type: AGREGAR_CARRITO,
      payload: producto,
    });
  };
};

export const eliminarCarrito = (id) => {
  return (dispatch) => {
    dispatch({
      type: ELIMINAR_CARRITO,
      payload: id,
    });
  };
};

export const ventaCarrito = payload => {
  return async () => {
    try {
      let res = await axios.post("https://ait-tesapi.herokuapp.com/sales", payload);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
};

export const eliminarTodoCarrito = () => {
  return (dispatch) => {
    dispatch({
      type: ELIMINAR_TODO_CARRITO,
    });
  };
}