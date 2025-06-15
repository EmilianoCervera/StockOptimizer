import { useReducer } from "react";
import { ListContext } from "../contexts/ListContext";
import { ListReducer } from "../reducers/ListReducer";

const initialState = {
  items: [],       // Lista actual de ítems
  savedLists: [],  // Listas guardadas
  orderHistory:[], // Historial de pedidos
};

export const ListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ListReducer, initialState);

  const addItem = (name, quantity) => {
    dispatch({
      type: "ADD_ITEM",
      payload: { name, quantity },
    });
  };

  const saveList = () => {
    dispatch({ type: "SAVE_LIST" });
  };

  const clearItems = () => {
    dispatch({ type: "CLEAR_ITEMS" });
  };

  const removeItem = (index) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: index,
    });
  };

  const removeSavedListItem = (listIndex, itemIndex) => {
    dispatch({
      type: "REMOVE_SAVED_LIST_ITEM",
      payload: { listIndex, itemIndex },
    });
  };

  return (
    <ListContext.Provider
      value={{
        state,
        addItem,
        saveList,
        clearItems,
        removeItem,
        removeSavedListItem,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
