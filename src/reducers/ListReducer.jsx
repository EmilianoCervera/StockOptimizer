export const ListReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] };
    case "SAVE_LIST":
      return {
        ...state,
        savedLists: [...state.savedLists, [...state.items]], // Agrega una copia de items a savedLists
        items: [], // Opcional: Limpia la lista actual después de guardar
      };
    case "CLEAR_ITEMS":
      return { ...state, items: [] };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((_, index) => index !== action.payload),
      };
    case "REMOVE_SAVED_LIST_ITEM":
      return {
        ...state,
        savedLists: state.savedLists.map((list, listIndex) =>
          listIndex === action.payload.listIndex
            ? list.filter((_, itemIndex) => itemIndex !== action.payload.itemIndex)
            : list
        ),
      };
    default:
      return state;
  }
};
