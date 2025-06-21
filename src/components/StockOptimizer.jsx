import { useContext, useState, useEffect } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  TextField,
  Tooltip,
  Fade,
} from "@mui/material";
import { Add, Remove, ArrowBack, Delete } from "@mui/icons-material";
import { DateTimeDisplay } from "./DateTimeDisplay";
import { AuthContext } from "../contexts/AuthContext";

export const StockOptimizer = ({ branchName, targetStock, onBack }) => {
  const [currentStock, setCurrentStock] = useState(
    targetStock.map((product) => ({ ...product, current: 0 }))
  );
  const [orderName, setOrderName] = useState("");
  const [savedOrders, setSavedOrders] = useState(() => {
    const saved = localStorage.getItem(`orders_${branchName}`);
    return saved ? JSON.parse(saved) : [];
  });

  const { user } = useContext(AuthContext);

  useEffect(() => {
    localStorage.setItem(`orders_${branchName}`, JSON.stringify(savedOrders));
  }, [savedOrders, branchName]);

  useEffect(() => {
    const saved = localStorage.getItem(`orders_${branchName}`);
    setSavedOrders(saved ? JSON.parse(saved) : []);
    setCurrentStock(targetStock.map((product) => ({ ...product, current: 0 })));
    setOrderName("");
  }, [branchName, targetStock]);

  const handleUpdateQuantity = (index, delta) => {
    setCurrentStock((prev) =>
      prev.map((product, i) =>
        i === index
          ? { ...product, current: Math.max(product.current + delta, 0) }
          : product
      )
    );
  };

  const calculateRestock = () =>
    currentStock.map((product) => ({
      name: product.name,
      required: Math.max(product.target - product.current, 0),
    }));

  const handleSubmit = () => {
    if (!orderName.trim()) {
      alert("Por favor, ingrese un nombre para el pedido.");
      return;
    }

    const restockList = calculateRestock();
    const newOrder = {
      name: orderName,
      time: new Date().toLocaleString(),
      details: restockList,
    };

    setSavedOrders((prev) => [...prev, newOrder]);
    setCurrentStock(targetStock.map((product) => ({ ...product, current: 0 })));
    setOrderName("");

    alert(
      `Pedido por "${orderName}" generado:\n` +
        restockList
          .map(
            (item) =>
              `${item.name}: ${item.required} ${
                item.required > 1 ? "unidades" : "unidad"
              }`
          )
          .join("\n")
    );
  };

  // Nueva función para eliminar un pedido del historial
  const handleDeleteOrder = (index) => {
    setSavedOrders((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Botón para volver a la pantalla de sucursales alineado a la derecha */}
      {onBack && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Tooltip
            title="Volver a sucursales"
            arrow
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 300 }}
          >
            <Button
              variant="outlined"
              onClick={onBack}
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
              <ArrowBack />
            </Button>
          </Tooltip>
        </Box>
      )}
      {/* Título con el nombre de la sucursal */}
      <Typography variant="h5" gutterBottom>
        Optimizador de Stock {branchName ? `- ${branchName}` : ""}
      </Typography>
      {/* Campo para ingresar el nombre del pedido */}
      <TextField
        label="Nombre - Name"
        variant="outlined"
        value={orderName}
        onChange={(e) => setOrderName(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      {/* Lista de productos y controles para sumar/restar stock */}
      <List>
        {currentStock.map((product, index) => (
          <ListItem key={product.name} sx={{ display: "flex", alignItems: "center" }}>
            <ListItemText
              primary={product.name}
              secondary={`Objetivo: ${product.target} unidades`}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                color="primary"
                onClick={() => handleUpdateQuantity(index, -1)}
              >
                <Remove />
              </IconButton>
              <Box
                sx={{
                  width: 60,
                  height: 36,
                  border: "1px solid #ccc",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="body1">{product.current}</Typography>
              </Box>
              <IconButton
                color="primary"
                onClick={() => handleUpdateQuantity(index, 1)}
              >
                <Add />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
      {/* Botón para generar el pedido */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ marginTop: 3 }}
        fullWidth
      >
        Generar Pedido
      </Button>
      {/* Historial de pedidos realizados */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" gutterBottom>
          Historial de Pedidos
        </Typography>
        {savedOrders.length > 0 ? (
          savedOrders.map((order, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                mb: 2,
                border: "1px solid #eee",
                borderRadius: 2,
                background: "#fafafa",
                boxShadow: 1,
                p: 2,
              }}
            >
              {/* Botón eliminar en la esquina superior derecha */}
              <IconButton
                size="small"
                onClick={() => handleDeleteOrder(index)}
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  color: "#d32f2f",
                  background: "#fff",
                  "&:hover": { background: "#ffeaea" },
                }}
                aria-label="Eliminar pedido"
              >
                <Delete fontSize="small" />
              </IconButton>
              <DateTimeDisplay
                dateTime={order.time}
                orderDetails={order.details}
                orderName={order.name}
              />
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No hay pedidos generados aún.
          </Typography>
        )}
      </Box>
      {/* Muestra el usuario autenticado */}
      <Typography variant="body2" color="text.secondary">
        {user
          ? `${user.name} ${user.lastname}`
          : "No autenticado"}
      </Typography>
    </Box>
  );
};