import { useReducer } from "react";
import { AuthReducer, initialAuthState } from "../reducers/AuthReducer";
import { AuthContext } from "../contexts/AuthContext";

const AUTH_USER = import.meta.env.VITE_AUTH_USER;
const AUTH_PASSWORD = import.meta.env.VITE_AUTH_PASSWORD;

// Agrega estos logs para debug
console.log("VITE_AUTH_USER:", AUTH_USER);
console.log("VITE_AUTH_PASSWORD:", AUTH_PASSWORD);


export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialAuthState);

  const login = (usuario, password) => {
    if (usuario === AUTH_USER && password === AUTH_PASSWORD) {
      dispatch({ 
        type: "LOGIN", 
        payload: { 
          usuario:{
            name: "Stock Optimizer",
            lastname: "Admin",}
        } 
      });
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  const logout = () => {
    dispatch({ 
      type: "LOGOUT" 
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};