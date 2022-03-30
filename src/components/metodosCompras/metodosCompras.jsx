import React from "react";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { ventaCarrito, eliminarTodoCarrito } from "../../redux/actions/index";

//Mui
import {Button, Dialog, DialogContent, DialogTitle} from "@mui/material";

//Swal
import Swal from "sweetalert2";

export default function MetodosCompras({open, Transition, handleClose}) {
    const dispatch = useDispatch();

    const carrito = useSelector((state) => state.carrito);
    const venta = useSelector((state) => state.venta);

    const handleClickVenta = () => {
        dispatch(ventaCarrito(carrito));
        setTimeout(() => {
          venta === "created"
            ? Swal.fire({
                text: "Compra Completada",
                confirmButtonText: "Ok",
                icon: "success",
                width: "auto",
                timer: 2500,
              })
            : Swal.fire({
                text: "Compra Cancelada",
                confirmButtonText: "Ok",
                icon: "error",
                width: "auto",
                timer: 2500,
              });
          dispatch(eliminarTodoCarrito());
        }, 1000);
      };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Como quiere realizar la compra?"}</DialogTitle>
        <DialogContent>
            <Button onClick={handleClickVenta}>Efectivo</Button>
            <Button>Tarjeta</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
