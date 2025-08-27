import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./paginas/login/page";
import Construccion from "./paginas/construccion/page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/construccion" element={<Construccion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

