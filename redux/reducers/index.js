import { combineReducers } from "redux";
import catgeoryListReducer from "./categoryListReducer";
import notesListReducer from "./notesListReducer";
import activeNoteIdReducer from "./activeNoteIdReducer";

const allReducers = {
  categories: catgeoryListReducer,
  notes: notesListReducer,
  activeNoteId:activeNoteIdReducer
};

const rootReducers = combineReducers(allReducers);

export default rootReducers;
