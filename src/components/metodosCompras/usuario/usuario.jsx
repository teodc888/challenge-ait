import React from "react";

//Mui
import {
  Button,
  DialogContent,
  DialogTitle,
  Stack,
  Grid,
  Box,
  TextField,
} from "@mui/material";

export default function Usuario({ setDatos, setUsuario, usuario }) {
  const handleClick = () => {
    setDatos(true);
  };

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <DialogTitle>{"Cargar datos personajes"}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleClick}>
          <Stack direction="column" alignItems="center" justifyContent="center">
            <Box sx={{ width: "100%", mt: "2%" }}>
              <Grid container spacing={2} columns={16}>
                <Grid item xs={16}>
                  <TextField
                    id="outlined-basic"
                    label="Nombre"
                    variant="outlined"
                    type="text"
                    fullWidth
                    required
                    name="nombre"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={16}>
                  <TextField
                    id="outlined-basic"
                    label="Apellido"
                    variant="outlined"
                    type="text"
                    fullWidth
                    required
                    name="apellido"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={16}>
                  <TextField
                    id="outlined-basic"
                    label="Direccion"
                    variant="outlined"
                    type="text"
                    fullWidth
                    required
                    name="direccion"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={16}>
                  <TextField
                    id="outlined-basic"
                    label="Numero de telefono"
                    variant="outlined"
                    type="number"
                    fullWidth
                    required
                    name="telefono"
                    onChange={handleChange}
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
              Guardar
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </>
  );
}
