import { NOTE_ACTIONS } from "../actions/actionTypes";
import { v4 as uuidv4 } from "uuid";
import { initialText } from "../../utils/initialNotes";

const notesList = [
  {
    id: "mpr-4070-222",
    category: "react",
    created: "2022-06-21T17:22:55+05:30",
    favorite: false,
    lastUpdated: "2022-06-21T17:22:55+05:30",
    text: initialText,
    trash: false,
  },
];

const notesListReducer = (state = notesList, action) => {
  switch (action.type) {
    case NOTE_ACTIONS.ADD_NOTE:
      return [
        {
          id: uuidv4(),
          category: action.category,
          created: action.created,
          favorite: false,
          lastUpdated: action.lastUpdated,
          text: action.text,
          trash: false,
        },
        ...state,
      ];

    case NOTE_ACTIONS.UPDATE_NOTE:
      return state?.map((note) =>
        note?.id === action?.id
          ? { ...note, text: action.text, lastUpdated: action.lastUpdated }
          : note
      );

    case NOTE_ACTIONS.ADD_TO_FAVORITE:
      return state?.map((note) =>
        note?.id === action?.id ? { ...note, favorite: action.favorite } : note
      );

    case NOTE_ACTIONS.ADD_TO_TRASH:
      return state?.map((note) =>
        note?.id === action?.id ? { ...note, trash: action.trash } : note
      );

    case NOTE_ACTIONS.ADD_CATEGORY_TO_NOTE:
      return state?.map((note) =>
        note?.id === action?.id ? { ...note, category: action.category } : note
      );

    case NOTE_ACTIONS.DELETE_NOTE:
      return state.filter((note) => note.id !== action.id);

    default:
      return state;
  }
};

export default notesListReducer;
