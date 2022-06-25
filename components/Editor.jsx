import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { updateNote } from "../redux/actions/notesListActions";

import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/gfm/gfm.js";
import "codemirror/theme/darcula.css";
import "codemirror/addon/selection/active-line";
import "codemirror/addon/scroll/scrollpastend";

const Editor = () => {
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
        }}
        //onChange={(editor, data, value) => {}}
      />
    </>
  );
};

export default Editor;
