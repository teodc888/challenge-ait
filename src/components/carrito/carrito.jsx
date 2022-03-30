import React from "react";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { ventaCarrito, eliminarTodoCarrito } from "../../redux/actions/index";

//Componentes
import CardCh from "../card/card";

//Mui
import { Grid, Box, Stack, Typography, Button } from "@mui/material";

export default function Carrito() {
  const dispatch = useDispatch();

  const carrito = useSelector((state) => state.carrito);

  const total = carrito.reduce((acc, cur) => {
    const precio = cur.price.slice(1);
    return acc + Number(precio);
  }, 0);

  const handleClickVenta = () => {
    dispatch(ventaCarrito(carrito));
  };

  const handleClickEliminar = () => {
    dispatch(eliminarTodoCarrito());
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ mb: "2%" }}
        >
          <Typography variant="h1" component="div" textAlign="center">
            Carrito
          </Typography>
          <Typography variant="h5" component="div" textAlign="center">
            Precio Total {total}
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={handleClickEliminar}
            sx={{ mt: "2%" }}
          >
            Borrar Todo
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleClickVenta}
            sx={{ mt: "2%" }}
          >
            comprar
          </Button>
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
      </Box>
    </>
  );
}
