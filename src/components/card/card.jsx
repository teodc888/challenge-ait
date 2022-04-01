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
  Popover,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";

//toastify
import { toast } from "react-toastify";

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

  //Agregar Eliminar del carrito
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
      toast.success("Producto guardado con éxito", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch(eliminarCarrito(id));
      toast.error("Producto eliminado con éxito", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const eliminarDelCarrito = () => {
    dispatch(eliminarCarrito(id));
    toast.error("Productos eliminados con éxito", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  //Popover
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Card sx={{ maxWidth: 300, margin: "auto" }}>
      {stock === 0 ? (
        <Alert severity="error" sx={{ position: "absolute" }}>
          Sin Stock
        </Alert>
      ) : tipo !== "carrito" ? (
        <Alert severity="info" sx={{ position: "absolute" }}>
          Cantidad: {stock}
        </Alert>
      ) : null}
      <CardMedia
        component="img"
        height="300"
        image={imagen}
        sx={{ objectFit: "contain" }}
        alt="green iguana"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          fontFamily="Helvetica Neue"
        >
          {titulo}
        </Typography>
        <Typography
          gutterBottom
          variant="h7"
          component="div"
          fontFamily={"-apple-system"}
        >
          {precio}
        </Typography>
      </CardContent>
      <CardActions sx={{ float: "left" }}>
        {tipo !== "carrito" ? (
          stock > 0 ? (
            <Checkbox
              checked={checked}
              onChange={agregarAlCarrito}
              icon={<ShoppingCartOutlinedIcon sx={{ color: "green" }} />}
              checkedIcon={<ShoppingCartIcon sx={{ color: "green" }} />}
            />
          ) : (
            <IconButton disabled>
              <ShoppingCartOutlinedIcon />
            </IconButton>
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
      <CardActions sx={{ float: "right" }}>
        <IconButton
          aria-label="info"
          sx={{ color: "#00e5ff" }}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          <InfoIcon />
        </IconButton>
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none",
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1 }} fontFamily="Segoe UI Symbol">
            {descripcion}
          </Typography>
        </Popover>
      </CardActions>
    </Card>
  );
}
