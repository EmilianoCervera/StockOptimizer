import { useContext } from "react";
import { AuthProvider } from "./providers/AuthProvider";
import { AuthContext } from "./contexts/AuthContext";
import { BranchesScreen } from "./components/BranchesScreen";
import { LoginPage } from "./components/ui/LoginPage";

function AppContent() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
      {isAuthenticated ? <BranchesScreen /> : <LoginPage />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;