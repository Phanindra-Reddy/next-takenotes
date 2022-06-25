import { CATEGORY_ACTIONS } from "../actions/actionTypes";
import { v4 as uuidv4 } from "uuid";

const categories = [];

const catgeoryListReducer = (state = categories, action) => {

  switch (action.type) {
    case CATEGORY_ACTIONS.ADD_CATEGORY:
      return [
        ...state,
        {
          id: uuidv4(),
          category_name: action.category_name,
        },
      ];

    case CATEGORY_ACTIONS.RENAME_CATEGORY:
      return state.map((category) =>
        category.id === action.id
          ? { ...category, category_name: action.category_name }
          : category
      );

    case CATEGORY_ACTIONS.DELETE_CATEGORY:
      return state.filter((category) => category.id !== action.id);

    default:
      return state;
  }
};

export default catgeoryListReducer;
