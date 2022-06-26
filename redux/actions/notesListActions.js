import { NOTE_ACTIONS } from "./actionTypes";

export const addNote = (text, category, created, lastUpdated) => {
  return {
    type: NOTE_ACTIONS.ADD_NOTE,
    text,
    category,
    created,
    lastUpdated,
  };
};

export const updateNote = (id, text, lastUpdate) => {
  return {
    type: NOTE_ACTIONS.UPDATE_NOTE,
    id,
    text,
    lastUpdate,
  };
};

export const addToFavourite = (id, favorite) => {
  return{
    type:NOTE_ACTIONS.ADD_TO_FAVORITE,
    id,
    favorite
  }
}

export const addCategoryToNote = (id, category) => {
  return{
    type:NOTE_ACTIONS.ADD_CATEGORY_TO_NOTE,
    id,
    category
  }
}

export const addToTrash = (id, trash) => {
  return{
    type:NOTE_ACTIONS.ADD_TO_TRASH,
    id,
    trash
  }
}

export const deleteNote = (id) => {
  return {
    type:NOTE_ACTIONS.DELETE_NOTE,
    id
  }
}

export const emptyTrash = () => {
  return {
    type:NOTE_ACTIONS.EMPTY_TRASH,
  }
}
