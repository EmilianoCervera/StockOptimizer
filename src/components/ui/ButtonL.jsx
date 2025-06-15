import { useContext } from "react";
import { Button, Tooltip, Fade } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../../contexts/AuthContext";

export const ButtonL = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Tooltip
      title="Cerrar sesión"
      arrow
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 300 }}
    >
      <Button
        variant="outlined"
        onClick={logout}
        sx={{
          minWidth: 0,
          width: 40,
          height: 40,
          padding: 0,
          borderRadius: "50%",
          borderColor: "#1976d2",
          color: "#1976d2",
          background: "rgba(255,255,255,0.7)",
          boxShadow: 1,
          "&:hover": {
            borderColor: "#1565c0",
            background: "rgba(25, 118, 210, 0.1)",
            color: "#1565c0",
          },
          fontWeight: "bold",
          fontSize: "1rem",
        }}
      >
        <LogoutIcon />
      </Button>
    </Tooltip>
  );
};