import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./features/home/Home";
import Projects from "./features/projects/Projects";
import ContactMe from "./features/contactMe/ContactMe";
import About from "./features/about/About";
import NotFound from "./features/errors/NotFound";
import Skills from "./features/skills/Skills";
import "./App.css";
import { GlobalProvider, useGlobalContext } from "./config/GlobalContext";

const AppContent = () => {
  const { singlePageWebsite } = useGlobalContext();

  return (
    <MainLayout
      config={{
        showTopbar: true,
        showSidebar: false,
        showFooter: false,
        singlePageWebsite,
      }}
    >
      {singlePageWebsite ? (
        <>
          <section id="home">
            <Home />
          </section>
          <section id="about">
            <About />
          </section>
          <section id="skills">
            <Skills />
          </section>
          <section id="projects">
            <Projects />
          </section>
          <section id="contactme">
            <ContactMe />
          </section>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contactme" element={<ContactMe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </MainLayout>
  );
};

function App() {
  return (
    <Router>
      <GlobalProvider>
        <AppContent />
      </GlobalProvider>
    </Router>
  );
}

export default App;
