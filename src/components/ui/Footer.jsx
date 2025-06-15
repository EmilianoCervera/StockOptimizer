import { Box, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100vw", // Cambiado a 100vw
        backgroundColor: "primary.main",
        color: "white",
        textAlign: "center",
        padding: 2,
        marginTop: "auto",
        left: 0,
        position: "relative",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Mi Aplicación. Todos los derechos reservados.
      </Typography>
    </Box>
  );
};