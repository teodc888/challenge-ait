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
  Checkbox
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";

export default function Navbar({ setMode }) {
  const navigate = useNavigate();

  //dark mode
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [setMode]
  );

  //Todos los productos del carrito para usarlo en el Badge
  const carrito = useSelector((state) => state.carrito);

  //Funcion para ir al carrito
  const handleClickCarrito = () => {
    navigate("/carrito");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#263238" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Challenge AIT
          </Typography>
          <Checkbox
            icon={<Brightness4Icon sx={{ color: "white" }} />}
            checkedIcon={<Brightness4OutlinedIcon sx={{ color: "white" }} />}
            onClick={colorMode.toggleColorMode}
          />
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={handleClickCarrito}
          >
            <Badge badgeContent={carrito.length} color="success">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
