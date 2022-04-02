import React, { useState } from "react";

//Mui
import {
  Button,
  DialogContent,
  DialogTitle,
  Stack,
  CardMedia,
  Card,
  Grid,
  Box,
  TextField,
} from "@mui/material";

const validateForm = (datosTarjeta) => {
  let error = {};
  if (datosTarjeta.numeroTarjeta.length !== 16)
    error.numeroTarjeta = "El numero de tarjeta debe tener 16 digitos";
  else if (datosTarjeta.codigoSeguridad.length !== 3)
    error.codigoSeguridad = "El codigo de seguridad tiene que tener 3 digitos";
  return error;
};

export default function Tarjeta({
  volver,
  handleClickVenta,
  usuario,
  setError,
  error,
}) {
  const [datosTarjeta, setDatosTarjeta] = useState({
    nombreTitular: usuario.nombre + " " + usuario.apellido,
    numeroTarjeta: 0,
    codigoSeguridad: 0,
  });

  const handleChange = (e) => {
    setDatosTarjeta({
      ...datosTarjeta,
      [e.target.name]: e.target.value,
    });
    setError(
      validateForm({ ...datosTarjeta, [e.target.name]: e.target.value })
    );
  };

  return (
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
        <form onSubmit={(e) => handleClickVenta(e)}>
          <Stack direction="column" alignItems="center" justifyContent="center">
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
                    name="numeroTarjeta"
                    onChange={handleChange}
                    helperText={error.numeroTarjeta}
                    error={error.numeroTarjeta ? true : false}
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
                    name="fechaVencimiento"
                    onChange={handleChange}
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
                    name="nombreTitular"
                    value={datosTarjeta.nombreTitular}
                    focused
                    onChange={handleChange}
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
                    name="codigoSeguridad"
                    onChange={handleChange}
                    helperText={error.codigoSeguridad}
                    error={error.codigoSeguridad ? true : false}
                  />
                </Grid>
              </Grid>
            </Box>
            <Button
              variant="contained"
              color="success"
              type="submit"
              sx={{ mt: "5%" }}
            >
              Pagar
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </>
  );
}
