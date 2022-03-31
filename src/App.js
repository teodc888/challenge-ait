import * as React from "react";

import { useEffect } from "react";

//Boostrap
import "bootstrap/dist/css/bootstrap.min.css";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { getProducts, cambiarColor } from "./redux/actions/index";

// React Router
import { Routes, Route } from "react-router-dom";

//Componentes
import Home from "./components/home/home";
import Navbar from "./components/navbar/navbar";
import Carrito from "./components/carrito/carrito";

//MUi modo dark
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

//toastify
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  //modo dark
  const color = useSelector((state) => state.color);
  const [mode, setMode] = React.useState(color);
  dispatch(cambiarColor(mode));

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar setMode={setMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carrito" element={<Carrito />} />
        </Routes>
        <ToastContainer />
      </ThemeProvider>
    </div>
  );
}

export default App;
