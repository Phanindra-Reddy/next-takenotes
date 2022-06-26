import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { addToFavourite, addToTrash } from "../redux/actions/notesListActions";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Preview from "./Preview";
import { Scrollbars } from "react-custom-scrollbars-2";

import { initialText } from "../utils/initialNotes";

const DynamicEditor = dynamic(() => import("./Editor"), { ssr: false });

const todayTime = `${dayjs().format("hh:mm A")} on  ${dayjs().format(
  "DD/MM/YYYY"
)}`;

const NoteEditor = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const activeNoteId = useSelector((state) => state.activeNoteId);

  const [currentNote, setCurrentNote] = useState("");
  const [currentNoteFavorite, setCurrentNoteFavorite] = useState(null);
  const [currentNoteTrash, setCurrentNoteTrash] = useState(null);

  //editor_peview_toggle
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    let active_note = notes?.find((note) => note?.id === activeNoteId);
    let noteFavorite = active_note?.favorite;
    let noteTrash = active_note?.trash;
    setCurrentNoteFavorite(noteFavorite);
    setCurrentNoteTrash(noteTrash);
    setCurrentNote(active_note?.text);
  }, [activeNoteId, notes]);

  const handleShowPreview = () => {
    setShowPreview(!showPreview);
  };

  const getNoteTitle = (text) => {
    let noteText = text.trim().match(/[^#]{1,45}/);
    return noteText && noteText[0].trim().split(/\r?\n/)[0];
  };

  const downloadNote = () => {
    const pom = document.createElement("a");
    pom.setAttribute(
      "href",
      `data:text/plain;charset=utf-8,${encodeURIComponent(currentNote)}`
    );
    pom.setAttribute("download", `${getNoteTitle(currentNote)}.md`);

    if (document.createEvent) {
      const event = document.createEvent("MouseEvents");
      event.initEvent("click", true, true);
      pom.dispatchEvent(event);
    } else {
      pom.click();
    }
  };

  return (
    <>
      <Scrollbars>{showPreview ? <Preview /> : <DynamicEditor />}</Scrollbars>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgb(229,229,229)",
          borderTop: "1px solid gray",
          position: "absolute",
          bottom: "0px",
        }}
      >
        <List sx={{ display: "flex" }}>
          <ListItem disablePadding onClick={handleShowPreview}>
            <ListItemButton
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {showPreview ? (
                <BorderColorOutlinedIcon />
              ) : (
                <VisibilityOutlinedIcon />
              )}
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            onClick={() =>
              dispatch(addToFavourite(activeNoteId, !currentNoteFavorite))
            }
          >
            <ListItemButton
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {currentNoteFavorite ? <StarIcon /> : <StarBorderOutlinedIcon />}
              {/* <StarBorderOutlinedIcon /> */}
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            onClick={() =>
              dispatch(addToTrash(activeNoteId, !currentNoteTrash))
            }
          >
            <ListItemButton
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DeleteOutlineIcon />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={downloadNote}>
            <ListItemButton
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FileDownloadOutlinedIcon />
            </ListItemButton>
          </ListItem>
        </List>

        <List sx={{ display: "flex" }}>
          {/* <ListItem disablePadding>
            <Typography variant="caption">{todayTime}</Typography>
          </ListItem> */}

          {/* <ListItem disablePadding>
            <ListItemButton
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AutorenewOutlinedIcon />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DarkModeOutlinedIcon />
            </ListItemButton>
          </ListItem> */}

          <ListItem disablePadding>
            <ListItemButton
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SettingsOutlinedIcon />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </>
  );
};

export default NoteEditor;
