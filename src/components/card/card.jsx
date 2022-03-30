import React, { useState } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { agregarCarrito, eliminarCarrito } from "../../redux/actions/index";

//Mui
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Alert,
  Checkbox,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CardCh({
  imagen,
  titulo,
  descripcion,
  stock,
  precio,
  id,
  tipo,
}) {
  const dispatch = useDispatch();

  const carrito = useSelector((state) => state.carrito);

  let aux1 = [];
  if (carrito.length > 0) {
    aux1 = carrito.map((el) => el.id);
  }

  let [checked, setChecked] = useState(aux1?.includes(id) ? true : false);

  const agregarAlCarrito = (event) => {
    setChecked(event.target.checked);
    if (checked === false) {
      dispatch(
        agregarCarrito({
          image: imagen,
          name: titulo,
          description: descripcion,
          stock: stock,
          price: precio,
          id: id,
          tipo: "carrito",
        })
      );
    } else {
      dispatch(eliminarCarrito(id));
    }
  };

  const eliminarDelCarrito = () => {
    dispatch(eliminarCarrito(id));
  };

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
        <Typography gutterBottom variant="h7" component="div">
          {precio}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {descripcion}
        </Typography>
      </CardContent>
      <CardActions>
        {tipo !== "carrito" ? (
          stock > 0 ? (
            <Checkbox
              checked={checked}
              onChange={agregarAlCarrito}
              icon={<ShoppingCartOutlinedIcon sx={{ color: "green" }} />}
              checkedIcon={<ShoppingCartIcon sx={{ color: "green" }} />}
            />
          ) : (
            <Alert severity="error" sx={{ borderRadius: "10%" }}>
              Sin Stock
            </Alert>
          )
        ) : (
          <IconButton
            aria-label="delete"
            onClick={eliminarDelCarrito}
            sx={{ color: "red" }}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}
