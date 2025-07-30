import { BrowserRouter as Router } from "react-router-dom";
import { GlobalProvider } from "./config/GlobalContext";
import { AuthProvider } from "./features/auth";
import { ThemeProvider } from "./contexts/ThemeContext";
import AppContent from "./AppContent";
import "./styles/themes/variables.css";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <GlobalProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </GlobalProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
