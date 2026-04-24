import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Fields from "./components/Fields";
import CreateField from "./components/CreateField";
import EditField from "./components/EditField";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/fields" element={<Fields />} />
        <Route path="/fields/create" element={<CreateField />} />
        <Route path="/fields/edit/:id" element={<EditField />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
