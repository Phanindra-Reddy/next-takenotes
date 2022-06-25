import { legacy_createStore } from "redux";
import throttle from "lodash.throttle";

import rootReducers from "../reducers";


function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.warn(err);
    return undefined;
  }
}

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.warn(e);
  }
}

let store = legacy_createStore(rootReducers, loadFromLocalStorage());

store.subscribe(
  throttle(() => {
    saveToLocalStorage({
      categories: store.getState().categories,
      notes:store.getState().notes,
      activeNoteId:store.getState().activeNoteId,
    });
  }, 1000)
);

export default store;


