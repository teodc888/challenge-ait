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
  CardMedia,
  Card,
  Grid,
  Box,
  TextField,
} from "@mui/material";

//Swal
import Swal from "sweetalert2";

export default function MetodosCompras({ open, Transition, handleClose }) {
  const dispatch = useDispatch();

  const [metodo, setMetodo] = useState("");

  const carrito = useSelector((state) => state.carrito);
  const venta = useSelector((state) => state.venta);

  const total = carrito.reduce((acc, cur) => {
    const precio = cur.price.slice(1);
    return acc + Number(precio);
  }, 0);

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
      setMetodo("");
    }, 1000);
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
        {metodo !== "tarjeta" ? (
          <>
            <DialogTitle>{"Como quiere realizar la compra?"}</DialogTitle>
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
                >
                  {" "}
                  Monto a pagar: ${total.toLocaleString("es-AR")}{" "}
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mb: "5%" }}
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
            <DialogTitle>
              <Button
                variant="contained"
                color="info"
                onClick={volver}
                sx={{ mr: "2%" }}
              >
                Volver
              </Button>
            </DialogTitle>
            <DialogContent>
              <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Card sx={{ maxWidth: 500 }}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="250"
                    image="https://www.bbva.es/content/dam/public-web/bbvaes/images/personas/productos/02_tarjetas/productos/credito/aqua-credito/2400x1600-card-tarjeta-aqua.jpg.img.768.1603104974176.jpg"
                  />
                </Card>
                <Box sx={{ width: "100%", mt: "5%" }}>
                  <Grid
                    container
                    rowSpacing={3}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-basic"
                        label="Numero de tarjeta"
                        variant="outlined"
                        type="number"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-basic"
                        label="Fecha de vencimiento"
                        variant="outlined"
                        type="month"
                        focused
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-basic"
                        label="Nombre del titular"
                        variant="outlined"
                        type="text"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-basic"
                        label="Codigo de seguridad"
                        variant="outlined"
                        type="number"
                        fullWidth
                        required
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleClickVenta}
                  type="submit"
                  sx={{ mt: "5%" }}

                >
                  Pagar
                </Button>
              </Stack>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
}
