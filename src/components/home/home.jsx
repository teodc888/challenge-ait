import React, { useEffect, useState } from "react";

//Componente
import CardCh from "../card/card";

//Mui
import { Grid, Box } from "@mui/material";

export default function Home() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("https://ait-tesapi.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data.products);
      });
  }, []);

  console.log(productos);

  return (
    <>
      <Box sx={{ width: "100%", marginTop: "3%" }}>
        <Grid
          container
          spacing={{ xs: 4, md: 5 }}
          columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
        >
          {productos.map((producto) => (
            <Grid item xs={4} sm={4} md={4} lg={4} key={producto._id}>
              <CardCh
                id={producto.id}
                imagen={producto.image}
                titulo={producto.name}
                descripcion={producto.description}
                stock={producto.stock}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
