import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "./home/Home";
import Dashboard from "./dashboard/Dashboard";
import LoginForm from "./features/auth/components/LoginForm";
// import RegisterForm from "./features/auth/components/RegisterForm";
// import ForgotPassword from "./features/auth/components/ForgotPassword";
import ProtectedRoute from "../routes/ProtectedRoute";
import NotFound from "./errors/NotFound";

// other imports...

const AppContent = () => {
  return (
    <MainLayout
      config={{
        showTopbar: true,
        showSidebar: false,
        showFooter: false,
      }}
    >
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        {/* <Route path="/register" element={<RegisterForm />} /> */}
        {/* <Route path="/reset-password" element={<ForgotPassword />} /> */}
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ...other protected routes in same way */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};

export default AppContent;
