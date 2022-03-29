import * as React from "react";

//Mui
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Alert,
} from "@mui/material";

export default function CardCh({ imagen, titulo, descripcion, stock }) {
  return (
    <Card sx={{ maxWidth: 345, margin: "auto", borderRadius: "5%" }}>
      <CardMedia
        component="img"
        height="350"
        image={imagen}
        sx={{ objectFit: "contain" }}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {descripcion}
        </Typography>
      </CardContent>
      <CardActions>
        {stock > 0 ? (
          <Button
            size="large"
            variant="contained"
            color="success"
            sx={{ borderRadius: "5%" }}
          >
            Agregar al carrito
          </Button>
        ) : (
          <Alert severity="error" sx={{ borderRadius: "10%" }}>
            Sin Stock
          </Alert>
        )}
      </CardActions>
    </Card>
  );
}
