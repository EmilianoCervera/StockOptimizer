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
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { DateTimeDisplay } from "./DateTimeDisplay";
import { AuthContext } from "../contexts/AuthContext";

// Componente principal para optimizar el stock de una sucursal
// Props:
// - branchName: nombre de la sucursal
// - targetStock: lista de productos y objetivos de stock
// - onBack: función para volver a la pantalla de sucursales
export const StockOptimizer = ({ branchName, targetStock, onBack }) => {
  // Estado para el stock actual de cada producto
  const [currentStock, setCurrentStock] = useState(
    targetStock.map((product) => ({ ...product, current: 0 }))
  );
  // Estado para el nombre del pedido
  const [orderName, setOrderName] = useState("");
  // Estado para el historial de pedidos (persistente por sucursal)
  const [savedOrders, setSavedOrders] = useState(() => {
    const saved = localStorage.getItem(`orders_${branchName}`);
    return saved ? JSON.parse(saved) : [];
  });

  // Contexto de autenticación para mostrar el usuario actual
  const { user } = useContext(AuthContext);

  // Guarda el historial de pedidos en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem(`orders_${branchName}`, JSON.stringify(savedOrders));
  }, [savedOrders, branchName]);

  // Si cambia la sucursal o la lista de productos, resetea historial y stock
  useEffect(() => {
    const saved = localStorage.getItem(`orders_${branchName}`);
    setSavedOrders(saved ? JSON.parse(saved) : []);
    setCurrentStock(targetStock.map((product) => ({ ...product, current: 0 })));
    setOrderName("");
  }, [branchName, targetStock]);

  // Actualiza la cantidad de un producto (sumar/restar)
  const handleUpdateQuantity = (index, delta) => {
    setCurrentStock((prev) =>
      prev.map((product, i) =>
        i === index
          ? { ...product, current: Math.max(product.current + delta, 0) }
          : product
      )
    );
  };

  // Calcula el pedido necesario para cada producto
  const calculateRestock = () =>
    currentStock.map((product) => ({
      name: product.name,
      required: Math.max(product.target - product.current, 0),
    }));

  // Maneja el envío del pedido
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

    // Agrega el nuevo pedido al historial (y se guarda en localStorage por el useEffect)
    setSavedOrders((prev) => [...prev, newOrder]);

    // Reinicia el estado del stock y el nombre del pedido
    setCurrentStock(targetStock.map((product) => ({ ...product, current: 0 })));
    setOrderName("");

    // Muestra un resumen del pedido generado
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

  return (
    <Box sx={{ padding: 3 }}>
      {/* Botón para volver a la pantalla de sucursales alineado a la derecha */}
      {onBack && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button variant="outlined" onClick={onBack}>
            Volver a sucursales
          </Button>
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
            <DateTimeDisplay
              key={index}
              dateTime={order.time}
              orderDetails={order.details}
              orderName={order.name}
            />
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
          ? `${user.usuario.name} ${user.usuario.lastname}`
          : "No autenticado"}
      </Typography>
    </Box>
  );
};