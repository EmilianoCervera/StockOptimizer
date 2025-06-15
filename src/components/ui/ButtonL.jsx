import { useContext } from "react";
import { Button } from "@mui/material";
import { AuthContext } from "../../contexts/AuthContext";

export const ButtonL = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Button
      variant="outlined"
      onClick={logout}
      sx={{
        position: "absolute",
        top: 16,
        right: 16,
        fontWeight: "bold",
        fontSize: { xs: "1.0rem", sm: "1.1rem" },
        background: "rgba(255,255,255,0.7)",
        borderRadius: 2,
        px: 2,
        borderColor: "#1976d2", // azul como el nav/footer de MUI
        color: "#1976d2",
        "&:hover": {
          borderColor: "#1565c0",
          background: "rgba(25, 118, 210, 0.1)",
          color: "#1565c0",
        },
      }}
    >
      Cerrar sesión
    </Button>
  );
};