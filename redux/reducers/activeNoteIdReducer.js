import { ACTIVE_NOTE_ID_ACTION } from "../actions/actionTypes";

const activeNoteId = "mpr-4070-222";

const activeNoteIdReducer = (state = activeNoteId, action) => {
  switch (action.type) {
    case ACTIVE_NOTE_ID_ACTION:
      return (activeNoteId = action?.id);

    default:
      return state;
  }
};

export default activeNoteIdReducer;
