import React from "react";
import { Box, Toolbar } from "@mui/material";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { LoginForm } from "./LoginForm";

export const LoginPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100vw", // Cambiado a 100vw
        margin: 0,
        padding: 0,
        overflowX: "hidden",
        bgcolor: "#f5f5f5",
        position: "relative",
      }}
    >
      <NavBar />
      <Toolbar />
      <Box
        sx={{
          flex: 1,
          width: "100vw", // Cambiado a 100vw
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "url('/fondo2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <LoginForm />
      </Box>
      <Footer />
    </Box>
  );
};