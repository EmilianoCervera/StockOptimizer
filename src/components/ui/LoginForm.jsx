import React, { useContext } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../contexts/AuthContext";

export const LoginForm = () => {
  const { formState, onChangeInput } = useForm();
  const { login } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    login(formState.usuario, formState.password);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        padding: 4,
        maxWidth: 300,
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Iniciar Sesión
      </Typography>
      <TextField
        id="usuario"
        name="usuario"
        label="Usuario"
        type="text"
        value={formState.usuario || ""}
        onChange={(e) => onChangeInput("usuario", e.target.value)}
        fullWidth
        required
      />
      <TextField
        id="password"
        name="password"
        label="Contraseña"
        type="password"
        value={formState.password || ""}
        onChange={(e) => onChangeInput("password", e.target.value)}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Ingresar
      </Button>
    </Box>
  );
};