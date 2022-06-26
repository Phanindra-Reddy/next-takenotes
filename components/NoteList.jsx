import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import BookIcon from "@mui/icons-material/Book";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addActiveNoteId } from "../redux/actions/activeNoteIdAction";
import {
  addToFavourite,
  addToTrash,
  addCategoryToNote,
  deleteNote,
  emptyTrash,
} from "../redux/actions/notesListActions";

const ITEM_HEIGHT = 48;

const NoteList = ({ navOptionActive, currentCategory }) => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const categories = useSelector((state) => state.categories);
  const currentNoteId = useSelector((state) => state.activeNoteId);
  const [notesList, setNotesList] = useState(null);
  const [activeNoteId, setActiveNoteId] = useState(currentNoteId);
  const [showMoreIcon, setShowMoreIcon] = useState(null);
  const [noteMoreIconId, setNoteMoreIconId] = useState("");
  const [notesSearchText, setNotesSearchText] = useState("");

  useEffect(() => {
    if (navOptionActive === "Notes") {
      setNotesList(notes);
    } else if (navOptionActive === "Favorite") {
      let favoritesNotes = notes?.filter((note) => note?.favorite === true);
      setNotesList(favoritesNotes);
    } else if(navOptionActive === "Trash") {
      let trashNotes = notes?.filter((note) => note?.trash === true);
      setNotesList(trashNotes);
    } else {
      let filteredCategoryNotesList = notes?.filter(
        (note) => note?.category === currentCategory
      );
      setNotesList(filteredCategoryNotesList)
    }
  }, [notes, navOptionActive, currentCategory]);


  const openCategoryMoreBtn = Boolean(showMoreIcon);

  const showCategoryMoreBtn = (e) => {
    setShowMoreIcon(e.currentTarget);
    setNoteMoreIconId(e.currentTarget.id);
  };

  const closeCategoryMoreBtn = () => {
    setShowMoreIcon(null);
  };

  const getNoteTitle = (text) => {
    let noteText = text.trim().match(/[^#]{1,45}/);
    return noteText && noteText[0].trim().split(/\r?\n/)[0];
  };

  const getNoteCategory = (id) => {
    let noteCategory = categories.find((category) => category?.id === id);
    return noteCategory?.category_name;
  };

  const handleCategoryChangeForNote = (id, value) => {
    dispatch(addCategoryToNote(id, value));
    closeCategoryMoreBtn();
  };

  const handleNoteSearch = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ background: "#E5E5E5", height: "100%" }}>
      <Box>
        <form
          style={{ padding: "8px", display: "flex" }}
          onKeyUp={handleNoteSearch}
        >
          <input
            type="text"
            placeholder="Searh for notes"
            value={notesSearchText}
            onChange={(e) => setNotesSearchText(e.target.value)}
            className="searchInput"
          />

          {navOptionActive === "Trash" && (
            <Button
              variant="contained"
              color="error"
              sx={{ ml: 1 }}
              onClick={() => dispatch(emptyTrash())}
            >
              Empty
            </Button>
          )}
        </form>
      </Box>

      <Divider />

      <List sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}>
        {notesList &&
          notesList?.map((note) => (
            <>
              <ListItem
                key={note?.id}
                secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      aria-label="more"
                      key={note?.id}
                      id={note?.id}
                      aria-controls={`${
                        openCategoryMoreBtn ? note?.id : undefined
                      }`}
                      aria-expanded={openCategoryMoreBtn ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={showCategoryMoreBtn}
                    >
                      <MoreHorizIcon
                        sx={{
                          color: `${
                            activeNoteId === note?.id ? "white" : "black"
                          }`,
                        }}
                      />
                    </IconButton>

                    {note?.id === noteMoreIconId && (
                      <Menu
                        id={note?.id}
                        MenuListProps={{
                          "aria-labelledby": note?.id,
                        }}
                        anchorEl={showMoreIcon}
                        open={openCategoryMoreBtn}
                        onClose={closeCategoryMoreBtn}
                        PaperProps={{
                          style: {
                            maxHeight: ITEM_HEIGHT * 5,
                            width: "25ch",
                          },
                        }}
                      >
                        {navOptionActive !== "Trash" ? (
                          categories?.length >= 1 && (
                            <FormControl
                              sx={{ m: 1, mx: 2, minWidth: 180 }}
                              size="small"
                            >
                              <InputLabel id="demo-simple-select-label">
                                Category
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={
                                  note?.category === "Notes"
                                    ? "Notes"
                                    : note?.category
                                }
                                label="Category"
                                onChange={(e) =>
                                  handleCategoryChangeForNote(
                                    note?.id,
                                    e.target.value
                                  )
                                }
                              >
                                {categories?.map((category) => (
                                  <MenuItem
                                    key={category?.id}
                                    value={category?.id}
                                  >
                                    {category?.category_name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          )
                        ) : (
                          <MenuItem
                            onClick={() => {
                              dispatch(deleteNote(note?.id));
                              closeCategoryMoreBtn();
                            }}
                            sx={{
                              "&:hover": {
                                background: "red",
                                color: "white",
                              },
                            }}
                          >
                            <CloseIcon sx={{ mr: 2 }} />
                            <ListItemText primary="Delete permanently" />
                          </MenuItem>
                        )}

                        {navOptionActive !== "Trash" && (
                          <MenuItem
                            onClick={() => {
                              dispatch(
                                addToFavourite(note?.id, !note?.favorite)
                              );
                              closeCategoryMoreBtn();
                            }}
                          >
                            <StarOutlineIcon sx={{ mr: 2 }} />
                            <ListItemText
                              primary={
                                note?.favorite
                                  ? `Remove favorite`
                                  : `Mark as favorite`
                              }
                            />
                          </MenuItem>
                        )}

                        {navOptionActive !== "Trash" ? (
                          <MenuItem
                            onClick={() => {
                              dispatch(addToTrash(note?.id, !note?.trash));
                              closeCategoryMoreBtn();
                            }}
                          >
                            <DeleteIcon sx={{ mr: 2 }} />
                            <ListItemText primary="Move to trash" />
                          </MenuItem>
                        ) : (
                          <MenuItem
                            onClick={() => {
                              dispatch(addToTrash(note?.id, !note?.trash));
                              closeCategoryMoreBtn();
                            }}
                          >
                            <DeleteIcon sx={{ mr: 2 }} />
                            <ListItemText primary="Restore from trash" />
                          </MenuItem>
                        )}

                        <MenuItem
                          onClick={() => {
                            //dispatch(addToFavourite(note?.id, !note?.favorite));
                            closeCategoryMoreBtn();
                          }}
                        >
                          <FileDownloadOutlinedIcon sx={{ mr: 2 }} />
                          <ListItemText primary="Download" />
                        </MenuItem>
                      </Menu>
                    )}
                  </>
                }
                disablePadding
                sx={{
                  width: "100%",
                  display: `${
                    navOptionActive !== "Trash" && note?.trash ? "none" : "flex"
                  }`,
                  //display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0px 12px",
                  background: `${activeNoteId === note?.id ? "#3c70eb" : ""}`,
                  color: `${activeNoteId === note?.id ? "white" : "black"}`,
                }}
              >
                <ListItemButton
                  role={undefined}
                  onClick={() => {
                    setActiveNoteId(note?.id);
                    dispatch(addActiveNoteId(note?.id));
                  }}
                  dense
                >
                  <ListItemIcon>
                    {note?.favorite && (
                      <StarOutlineIcon
                        sx={{
                          color: `${
                            activeNoteId === note?.id ? "white" : "black"
                          }`,
                        }}
                      />
                    )}
                  </ListItemIcon>
                  <Box>
                    <ListItemText
                      primary={
                        note?.text ? getNoteTitle(note?.text) : "New note"
                      }
                    />
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "12px",
                      }}
                    >
                      <BookIcon sx={{ fontSize: "14px", mr: 1 }} />{" "}
                      {note?.category !== "Notes"
                        ? getNoteCategory(note?.category)
                        : "Notes"}
                    </Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          ))}
      </List>

      {/* {notesList &&
        notesList?.map((note) => (
          <Box
            key={note?.id}
            onClick={() => {
              setActiveNoteId(note?.id);
              dispatch(addActiveNoteId(note?.id));
            }}
          >
            <Button
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0px 12px",
                background: `${activeNoteId === note?.id ? "#3c70eb" : ""}`,
                "&:hover": {
                  background: "#757a85",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ color: "black", fontSize: "1.2rem" }}>
                  {note?.favorite && <StarOutlineIcon />}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: "start",
                    marginLeft: "1rem",
                    padding: "0.75rem",
                  }}
                >
                  <Typography
                    variant="body2"
                    display="block"
                    gutterBottom
                    sx={{
                      color: `${activeNoteId === note?.id ? "white" : "black"}`,
                    }}
                  >
                    {note?.text ? getNoteTitle(note?.text) : "New note"}
                  </Typography>
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "12px",
                      color: `${activeNoteId === note?.id ? "white" : "black"}`,
                    }}
                  >
                    <BookIcon sx={{ fontSize: "14px" }} />{" "}
                    {note?.category ? note?.category : "Notes"}
                  </Typography>
                </Box>
              </Box>
            </Button>
            <Divider />
          </Box>
        ))} */}
    </Box>
  );
};

export default NoteList;
