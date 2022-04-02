import React, { useState } from "react";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { ventaCarrito, eliminarTodoCarrito } from "../../redux/actions/index";

//Mui
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";

//Swal
import Swal from "sweetalert2";

//toastify
import { toast } from "react-toastify";

//Componentes
import Tarjeta from "./tarjeta/tarjeta";
import Usuario from "./usuario/usuario";

export default function MetodosCompras({
  open,
  Transition,
  handleClose,
  total,
}) {
  const dispatch = useDispatch();

  const [usuario, setUsuario] = useState({});

  const [datos, setDatos] = useState(false);

  const [metodo, setMetodo] = useState("");

  const [error, setError] = useState({});

  const carrito = useSelector((state) => state.carrito);

  const handleClickVenta = (e) => {
    e.preventDefault();
    if (Object.keys(error).length === 0) {
      dispatch(ventaCarrito(carrito));
      setTimeout(() => {
        Swal.fire({
          text: "Compra Completada",
          confirmButtonText: "Ok",
          icon: "success",
          width: "auto",
          timer: 2500,
        });
        dispatch(eliminarTodoCarrito());
        setMetodo("");
      }, 1000);
    } else {
      toast.error("Complete correctamente los campos", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const buttonTarjera = () => {
    setMetodo("tarjeta");
  };

  const volver = () => {
    setMetodo("");
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
        {datos === false ? (
          <Usuario
            setDatos={setDatos}
            setUsuario={setUsuario}
            usuario={usuario}
          />
        ) : metodo !== "tarjeta" ? (
          <>
            <DialogTitle>{`Como quiere realizar la compra ${usuario.nombre} ?`}</DialogTitle>
            <DialogContent>
              <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  variant="h7"
                  component="div"
                  textAlign="center"
                  sx={{ mb: "10%" }}
                  fontFamily={"-apple-system"}
                >
                  Monto a pagar: ${total.toLocaleString("es-AR")}
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mb: "6%" }}
                  onClick={handleClickVenta}
                >
                  Efectivo
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={buttonTarjera}
                >
                  Tarjeta
                </Button>
              </Stack>
            </DialogContent>
          </>
        ) : (
          <>
            <Tarjeta
              volver={volver}
              handleClickVenta={handleClickVenta}
              usuario={usuario}
              setError={setError}
              error={error}
            />
          </>
        )}
      </Dialog>
    </>
  );
}
