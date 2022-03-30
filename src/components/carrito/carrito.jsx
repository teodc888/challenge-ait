import React from "react";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { ventaCarrito, eliminarTodoCarrito } from "../../redux/actions/index";

//Componentes
import CardCh from "../card/card";

//Mui
import { Grid, Box, Stack, Typography, Button, Container } from "@mui/material";

//Swal
import Swal from "sweetalert2";

//router
import { useNavigate } from "react-router";

//toastify
import { toast } from "react-toastify";

export default function Carrito() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    }, 1000);
  };

  const handleClickEliminar = () => {
    dispatch(eliminarTodoCarrito());
    toast.success("Productos eliminados con éxito", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  const handleClickVolver = () => {
    navigate("/");
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ width: "100%" }}>
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ mb: "2%" }}
          >
            <Typography variant="h2" component="div" textAlign="center">
              Carrito
            </Typography>
            {carrito.length > 0 ? (
              <Button
                variant="contained"
                color="error"
                onClick={handleClickEliminar}
                sx={{ mt: "1%" }}
              >
                Borrar Todo
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={handleClickVolver}
                sx={{ mt: "1%" }}
              >
                Agregar al carrito
              </Button>
            )}
          </Stack>
          <Grid
            container
            spacing={{ xs: 4, md: 5 }}
            columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
          >
            {carrito.map((producto) => (
              <Grid item xs={4} sm={4} md={4} lg={4} key={producto.id}>
                <CardCh
                  id={producto.id}
                  imagen={producto.image}
                  titulo={producto.name}
                  descripcion={producto.description}
                  stock={producto.stock}
                  precio={producto.price}
                  tipo={producto.tipo}
                />
              </Grid>
            ))}
          </Grid>
          {carrito.length > 0 ? (
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="center"
              sx={{ mt: "2%" }}
            >
              <Typography variant="h5" component="div" textAlign="center">
                Precio Total ${total}
              </Typography>
              <Button
                variant="contained"
                color="success"
                onClick={handleClickVenta}
                sx={{ mt: "2%", mb: "2%" }}
              >
                Realizar la comprar
              </Button>
            </Stack>
          ) : null}
        </Box>
      </Container>
    </>
  );
}
