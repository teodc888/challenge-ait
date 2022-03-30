import {
  GET_PRODUCTOS,
  AGREGAR_CARRITO,
  ELIMINAR_CARRITO,
  ELIMINAR_TODO_CARRITO,
} from "../actions/actionsTypes";

const initialState = {
  productos: [],
  carrito: [],
  precio: "",
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTOS:
      return {
        ...state,
        productos: action.payload,
      };
    case AGREGAR_CARRITO:
      return {
        ...state,
        carrito: [...state.carrito, action.payload],
      };
    case ELIMINAR_CARRITO:
      return {
        ...state,
        carrito: state.carrito.filter(
          (producto) => producto.id !== action.payload
        ),
      };
    case ELIMINAR_TODO_CARRITO:
      return {
        ...state,
        carrito: [],
      };

    default:
      return state;
  }
}
