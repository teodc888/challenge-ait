import * as React from "react";

//Redux
import { useSelector } from "react-redux";

//Router
import { useNavigate } from "react-router";

//Mui
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Navbar() {
  const navigate = useNavigate();

  const carrito = useSelector((state) => state.carrito);

  const handleClickCarrito = () => {
    navigate("/carrito");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "red" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Challenge AIT
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={handleClickCarrito}
          >
            <Badge badgeContent={carrito.length} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
