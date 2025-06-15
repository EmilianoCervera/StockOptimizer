import { Box, Typography, List, ListItem } from "@mui/material";

export const DateTimeDisplay = ({ dateTime, orderDetails, orderName }) => {
  return (
    <Box sx={{ padding: 2, marginTop: 2, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Detalle del Pedido
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        A nombre de: {orderName}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Generado el: {dateTime}
      </Typography>
      <List>
        {orderDetails.map((item, index) => (
          <ListItem key={index}>
            {item.name}: {item.required} unidades
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
