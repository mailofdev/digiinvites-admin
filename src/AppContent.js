import { Routes, Route } from "react-router-dom";
import { useAuth } from "./features/auth/hooks/useAuth";
import MainLayout from "./layouts/MainLayout";
import AuthRouter from "./features/auth/components/AuthRouter";


import Home from "./features/home/Home";
import Projects from "./features/projects/Projects";
import ContactMe from "./features/contactMe/ContactMe";
import About from "./features/about/About";
import NotFound from "./features/errors/NotFound";
import Skills from "./features/skills/Skills";

const AppContent = () => {
  const { loading, isAuthenticated } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="loading-container min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // If not logged in, show auth router
  if (!isAuthenticated()) {
    return <AuthRouter />;
  }

  // If logged in, show MainLayout with routes
  return (
    <MainLayout
      config={{
        showTopbar: true,
        showSidebar: false,
        showFooter: false,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contactme" element={<ContactMe />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};

export default AppContent;
