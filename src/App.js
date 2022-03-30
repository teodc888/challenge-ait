import React, { useEffect } from 'react';

//Redux
import { useDispatch } from 'react-redux';
import {getProducts} from './redux/actions/index';

// React Router
import { Routes, Route } from "react-router-dom";

//Componentes
import Home from "./components/home/home";
import Navbar from "./components/navbar/navbar";
import Carrito from "./components/carrito/carrito";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
      
    </div>
  );
}

export default App;
