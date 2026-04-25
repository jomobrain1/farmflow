import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Fields from "./components/Fields";
import CreateField from "./components/CreateField";
import EditField from "./components/EditField";
import EditUser from "./components/EditUser";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminRoute from "./utils/AdminRoute";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

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
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/fields"
          element={
            <ProtectedRoute>
              <Fields />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fields/create"
          element={
            <ProtectedRoute>
              <CreateField />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fields/edit/:id"
          element={
            <ProtectedRoute>
              <EditField />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/edit/:id"
          element={
            <AdminRoute>
              <EditUser />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
