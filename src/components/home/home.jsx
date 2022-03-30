import React from "react";

//Redux
import { useSelector } from "react-redux";

//Componente
import CardCh from "../card/card";

//Mui
import { Grid, Box, Typography } from "@mui/material";

export default function Home() {
  const productos = useSelector((state) => state.productos);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="h2"
          component="div"
          textAlign="center"
          sx={{ mb: "3%" }}
        >
          Carta
        </Typography>
        <Grid
          container
          spacing={{ xs: 4, md: 5 }}
          columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
        >
          {productos.map((producto) => (
            <Grid item xs={4} sm={4} md={4} lg={3} key={producto._id}>
              <CardCh
                id={producto._id}
                imagen={producto.image}
                titulo={producto.name}
                descripcion={producto.description}
                stock={producto.stock}
                precio={producto.price}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
