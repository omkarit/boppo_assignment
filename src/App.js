import "./App.css";
import { Routes, Route } from "react-router-dom";
import Add from "./components/Add";
import Dashboard from "./components/Dashboard";
import Update from "./components/Update";

function App() {
  return (
    <Routes>
      <Route path="" element={<Dashboard />} />
      <Route path="/add" element={<Add />} />
      <Route path="/update" element={<Update />} />
    </Routes>
  );
}

export default App;
