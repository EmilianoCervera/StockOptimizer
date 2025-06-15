export const initialAuthState = {
  user: null, // { usuario: "nombre" }
  isAuthenticated: false,
};

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: { usuario: action.payload.usuario },
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};