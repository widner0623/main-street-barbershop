import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Display from "./pages/Display";
import AdminDisplay from "./pages/AdminDisplay";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/display" element={<Display />} />
      <Route path="/admin-display" element={<AdminDisplay />} />
    </Routes>
  );
}

export default App;