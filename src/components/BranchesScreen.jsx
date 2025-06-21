import { useState } from "react";
import { Box, Typography, ButtonBase, Grid, Paper } from "@mui/material";
import { StockOptimizer } from "./StockOptimizer";
import { ButtonL } from "./ui/ButtonL";

const branches = [
  {
    name: "Option 1",
    image:
      "/public/solido1.jpg",
    products: [
      { name: "Producto A", target: 6 },
      { name: "Producto B", target: 16 },
      { name: "Producto C", target: 7 },
      { name: "Producto D", target: 12 },
      { name: "Producto E", target: 1 },
      { name: "Producto F", target: 3 },
      { name: "Producto G", target: 25 },
      { name: "Producto H", target: 20 },
      { name: "Producto I", target: 1 },
      { name: "Producto J", target: 3 },
      { name: "Producto K", target: 3 },
      { name: "Producto L", target: 3 },
      { name: "Producto M", target: 3 },
      { name: "Producto N", target: 20 },
      { name: "Producto O", target: 1 },
      { name: "Producto P", target: 8 },
      { name: "Producto Q", target: 1 },
      { name: "Producto R", target: 1 },
      { name: "Producto S", target: 1 },
      { name: "Producto T", target: 1 },
      { name: "Producto U", target: 2 },
      { name: "Producto V", target: 6 },
      { name: "Producto W", target: 4 },
      { name: "Producto X", target: 1 },
      { name: "Producto Y", target: 15 }     
    ],
  },
  {
    name: "Option 2",
    image:
      "/solido2.jpg",
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
        backgroundImage: "url('/fondo6.gif')",
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
        Select an Optimizer
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