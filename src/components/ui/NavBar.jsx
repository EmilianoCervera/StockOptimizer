import { AppBar, Toolbar, Typography } from "@mui/material";

export const NavBar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100vw", // Cambiado a 100vw
        left: 0,
        top: 0,
        boxShadow: 3,
        zIndex: 1201,
        bgcolor: "primary.main",
      }}
    >
      <Toolbar
        sx={{
          minHeight: 64,
          px: { xs: 2, sm: 4 },
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            letterSpacing: 1,
            color: "#fff",
            textShadow: "1px 1px 4px rgba(0,0,0,0.15)",
          }}
        >
          Stock Optimizer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};