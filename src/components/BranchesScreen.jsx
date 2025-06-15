import { useState } from "react";
import { Box, Typography, ButtonBase, Grid, Paper } from "@mui/material";
import { StockOptimizer } from "./StockOptimizer";
import { ButtonL } from "./ui/ButtonL";

const branches = [
  {
    name: "Option 1",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    products: [
      { name: "Producto A", target: 10 },
      { name: "Producto B", target: 15 },
    ],
  },
  {
    name: "Option 2",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    products: [
      { name: "Producto X", target: 8 },
      { name: "Producto Y", target: 12 },
    ],
  },
  // Agrega más sucursales aquí...
];

export const BranchesScreen = () => {
  const [selectedBranch, setSelectedBranch] = useState(null);

  if (selectedBranch !== null) {
    return (
      <StockOptimizer
        branchName={branches[selectedBranch].name}
        targetStock={branches[selectedBranch].products}
        onBack={() => setSelectedBranch(null)}
      />
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        overflowX: "hidden",
        bgcolor: "#f5f5f5",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundImage: "url('/fondo2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          mb: 2,
          mt: { xs: 8, sm: 10 },
          textAlign: "center",
          fontWeight: "bold",
          fontSize: { xs: "1.5rem", sm: "2rem" },
          background: "rgba(255,255,255,0.7)",
          borderRadius: 2,
          px: 2,
        }}
      >
        Selecciona una sucursal
      </Typography>
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          mb: 3,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <ButtonL small />
      </Box>
      <Grid
        container
        spacing={3}
        sx={{ maxWidth: 1200, mx: "auto", pb: 4 }}
        justifyContent="center"
      >
        {branches.map((branch, idx) => (
          <Grid item xs={12} sm={6} md={4} key={branch.name}>
            <ButtonBase
              onClick={() => setSelectedBranch(idx)}
              sx={{
                width: "100%",
                borderRadius: 2,
                display: "block",
                height: "100%",
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  width: "100%",
                  maxWidth: 340,
                  minHeight: 210,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  p: 0,
                  borderRadius: 2,
                  transition: "box-shadow 0.2s",
                  "&:hover": { boxShadow: 6 },
                  mb: { xs: 2, sm: 0 },
                  // mx: "auto", // Elimina esto para mejor centrado
                  background: "rgba(255,255,255,0.85)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    textAlign: "center",
                    width: "100%",
                    py: 2,
                    pb: 1,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    background: "#fafafa",
                    boxSizing: "border-box",
                  }}
                >
                  {branch.name}
                </Typography>
                <Box
                  component="img"
                  src={branch.image}
                  alt={branch.name}
                  sx={{
                    width: "100%",
                    flexGrow: 1,
                    height: { xs: 140, sm: 180, md: 200 },
                    objectFit: "cover",
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                    display: "block",
                  }}
                />
              </Paper>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};