// React Router
import { Routes, Route } from "react-router-dom";

//Componentes
import Home from "./components/home/home";
import Navbar from "./components/navbar/navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      
    </div>
  );
}

export default App;
