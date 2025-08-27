
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/page";
import Login from "./pages/login/page";
import Construccion from "./pages/construccion/page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/construccion" element={<Construccion />} />
      </Routes>
    </Router>
  );
}

export default App;

