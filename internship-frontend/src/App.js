import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import UpdateInternship from "./pages/UpdateInternship";
import DeleteInternship from "./pages/DeleteInternship";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/update/:id"
          element={
            <PrivateRoute>
              <UpdateInternship />
            </PrivateRoute>
          }
        />

        <Route
          path="/delete/:id"
          element={
            <PrivateRoute>
              <DeleteInternship />
            </PrivateRoute>
          }
        />

        {/* Catch all - must be last */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
