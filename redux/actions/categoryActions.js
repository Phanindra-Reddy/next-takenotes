import { CATEGORY_ACTIONS } from "./actionTypes";

export const addCategory = (category_name) => {
  return {
    type: CATEGORY_ACTIONS.ADD_CATEGORY,
    category_name,
  };
};

export const renameCategory = (id, category_name) => {
  return {
    type: CATEGORY_ACTIONS.RENAME_CATEGORY,
    id,
    category_name,
  };
};

export const deleteCategory = (id) => {
  return {
    type: CATEGORY_ACTIONS.DELETE_CATEGORY,
    id,
  };
};
