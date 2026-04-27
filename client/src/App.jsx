import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import FarmersTable from "./components/FarmersTable";
import AnimalsTable from "./components/AnimalsTable";
import VaccinationsTable from "./components/VaccinationsTable";
import OfficersTable from "./components/OfficersTable";
import Auth from "./components/Auth";

// Farmer-specific components
import MyAnimals from "./components/MyAnimals";
import MyVaccinations from "./components/MyVaccinations";

import { AuthProvider, useAuth } from "./context/AuthContext";

// ✅ Protected Route Wrapper
function ProtectedRoute({ children, allowedRoles }) {
  const { user, role } = useAuth();

  if (!user) return <Navigate to="/auth" replace />;
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <main className="p-6">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Auth />} />

            {/* Common Protected Routes */}
            <Route
              path="/farmers"
              element={
                <ProtectedRoute allowedRoles={["officer", "admin"]}>
                  <FarmersTable />
                </ProtectedRoute>
              }
            />
            <Route
              path="/animals"
              element={
                <ProtectedRoute allowedRoles={["officer", "admin"]}>
                  <AnimalsTable />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vaccinations"
              element={
                <ProtectedRoute allowedRoles={["officer", "admin"]}>
                  <VaccinationsTable />
                </ProtectedRoute>
              }
            />
            <Route
              path="/officers"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <OfficersTable />
                </ProtectedRoute>
              }
            />

            {/* Farmer-Specific Routes */}
            <Route
              path="/my-animals"
              element={
                <ProtectedRoute allowedRoles={["farmer"]}>
                  <MyAnimals />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-vaccinations"
              element={
                <ProtectedRoute allowedRoles={["farmer"]}>
                  <MyVaccinations />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
