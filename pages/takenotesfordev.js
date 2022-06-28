import React, { useState, useEffect } from "react";
import Head from "next/head";
import SplitPane from "react-split-pane";

import AppSidebar from "../components/AppSidebar";
import NoteList from "../components/NoteList";
import NoteEditor from "../components/NoteEditor";
import { useSelector } from "react-redux";

import BorderColorIcon from "@mui/icons-material/BorderColor";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import BookIcon from "@mui/icons-material/Book";
import DeleteIcon from "@mui/icons-material/Delete";

const navOptions = [
  { id: 1, name: "Scratchpad", icon: <BorderColorIcon /> },
  { id: 2, name: "Notes", icon: <BookIcon /> },
  { id: 3, name: "Favorite", icon: <StarBorderIcon /> },
  { id: 4, name: "Trash", icon: <DeleteIcon /> },
];

const Takenotesfordev = () => {
  const categories = useSelector((state) => state.categories);
  const notes = useSelector((state) => state.notes);
  const activeNoteId = useSelector((state) => state.activeNoteId);

  const [currentNoteId, setCurrentNoteId] = useState("");
  const [navOptionActive, setNavOptionActive] = useState("Notes");
  const [noteCategories, setNoteCategories] = useState(null);
  const [currentCategory, setCurrentCategory] = useState("");

  useEffect(() => {
    setCurrentNoteId(activeNoteId);
  }, [activeNoteId]);

  useEffect(() => {
    setNoteCategories(categories);
  }, [categories]);

  return (
    <>
      <Head>
        <title>{navOptionActive && navOptionActive + " | " } Take Notes for Dev</title>
        <meta name="description" content="Created by Phanindra Reddy" />
        <link rel="icon" href="/takeNote.svg" />
      </Head>


      <>
        <SplitPane
          split="vertical"
          minSize={150}
          maxSize={500}
          defaultSize={240}
        >
          <AppSidebar
            navOptions={navOptions}
            navOptionActive={navOptionActive}
            setNavOptionActive={setNavOptionActive}
            noteCategories={noteCategories}
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
          />
          {navOptionActive !== "Scratchpad" ? (
            <SplitPane
              split="vertical"
              minSize={150}
              maxSize={500}
              defaultSize={300}
            >
              <NoteList
                navOptionActive={navOptionActive}
                currentCategory={currentCategory}
              />
              <NoteEditor navOptionActive={navOptionActive} />
            </SplitPane>
          ) : (
            <NoteEditor navOptionActive={navOptionActive} />
          )}
        </SplitPane>
      </>
    </>
  );
};

export default Takenotesfordev;
