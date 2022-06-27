import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { updateNote } from "../redux/actions/notesListActions";
import { addActiveNoteId } from "../redux/actions/activeNoteIdAction";

import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/gfm/gfm.js";
import "codemirror/theme/darcula.css";
import "codemirror/theme/base16-light.css";
import "codemirror/addon/selection/active-line";
import "codemirror/addon/scroll/scrollpastend";

const Editor = ({ navOptionActive }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const notes = useSelector((state) => state.notes);
  const activeNoteId = useSelector((state) => state.activeNoteId);

  const [activeNote, setActiveNote] = useState("");

  useEffect(() => {
    let active_note = notes?.find((note) => note?.id === activeNoteId);
    let noteText = active_note?.text;
    setActiveNote(noteText);
  }, [activeNoteId]);

  useEffect(() => {
    const time = setTimeout(() => {
      dispatch(updateNote(activeNoteId, activeNote, dayjs().format()));
    }, 250);

    return () => clearTimeout(time);
  }, [activeNote, activeNoteId]);

  useEffect(() => {
    if (navOptionActive === "Scratchpad") {
      dispatch(addActiveNoteId("mpr-scratchpad"));
      let scratchpadNote = notes?.find((note) => note?.id === "mpr-scratchpad");
      let scratchpadNoteText = scratchpadNote?.text;
      setActiveNote(scratchpadNoteText);
    }
  }, [navOptionActive]);

  const handleNote = (editor, data, value) => {
    setActiveNote(value);
  };

  return (
    <>
      <CodeMirror
        onBeforeChange={handleNote}
        value={activeNote}
        options={{
          mode: "gfm",
          theme: "darcula",
          lineNumbers: true,
          lineWrapping: true,
          autofocus: true,
          styleActiveLine: true,
          sidebarVisible: true,
        }}
        //onChange={(editor, data, value) => {}}
      />
    </>
  );
};

export default Editor;
