import {ACTIVE_NOTE_ID_ACTION} from "./actionTypes";

export const addActiveNoteId = (id) => {
    return {
        type:ACTIVE_NOTE_ID_ACTION,
        id
    }
}