import React, { useState } from "react";

//Redux
import { useSelector } from "react-redux";

//Componente
import CardCh from "../card/card";
import Paginado from "../paginado/paginado";

//Mui
import { Grid, Box, Typography, Stack } from "@mui/material";

export default function Home() {
  const productos = useSelector((state) => state.productos);

  //Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [productoPorPagina] = useState(8);
  const indeceDelUltimoProducto = currentPage * productoPorPagina; // 8
  const indiceDelPrimerProducto = indeceDelUltimoProducto - productoPorPagina; // 0
  const currentProductos = productos.slice(
    indiceDelPrimerProducto,
    indeceDelUltimoProducto
  );
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ mb: "3%" }}
        >
          <Typography
            variant="h2"
            component="div"
            textAlign="center"
            sx={{ mb: "1%", fontSize: "70px" }}
            fontFamily="Segoe UI Symbol"
          >
            Carta
          </Typography>
          <Paginado
            paginado={paginado}
            productoPorPagina={productoPorPagina}
            productos={productos.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Stack>
        <Grid
          container
          spacing={{ xs: 4, md: 5 }}
          columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
          sx={{ mb: "5%" }}
        >
          {currentProductos.map((producto) => (
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
