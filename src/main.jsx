import { StrictMode } from "react";
import { createRoot } from "react-dom/client"; // Cambiado a createRoot
import "./styles/global.css"; // Asegúrate de que este archivo existe y es correcto
import App from "./App"; // Importa el componente principal
import { ListProvider } from "./providers/ListProvider"; // Importa el proveedor de contexto

// Crea la raíz e inicia el renderizado
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ListProvider>
      <App />
    </ListProvider>
  </StrictMode>
);
