import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import BookIcon from "@mui/icons-material/Book";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AddIcon from "@mui/icons-material/Add";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars-2";
import dayjs from "dayjs";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategory,
  renameCategory,
} from "../redux/actions/categoryActions";
import { addNote } from "../redux/actions/notesListActions";
import { addActiveNoteId } from "../redux/actions/activeNoteIdAction";

const ITEM_HEIGHT = 48;



const AppSidebar = ({navOptions,navOptionActive, setNavOptionActive}) => {
  const notes = useSelector((state) => state.notes);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  
  const [noteCategories, setNoteCategories] = useState(null);
  const [openCategories, setCategories] = useState(true);
  const [showMoreIcon, setShowMoreIcon] = useState(null);
  const [categoryInput, setCategoryInput] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState("");
  const [editCategoryInput, setEditCategoryInput] = useState("");
  const [categoryInputValue, setCategoryInputValue] = useState("");
  const [activeCategoryMoreBtnId, setActiveCategoryMoreBtnId] = useState("");
  const [categoryRenameMsg, setCategoryRenameMsg] = useState("");
  const categoryInputValueRef = useRef(null);

  useEffect(() => {
    setNoteCategories(categories);
  }, [categories]);

  useEffect(() => {
    if (categoryInput) {
      categoryInputValueRef.current.focus();
    }
  }, [categoryInput]);

  const handleCategoryFolders = () => {
    setCategories(!openCategories);
  };

  const openCategoryMoreBtn = Boolean(showMoreIcon);
  const showCategoryMoreBtn = (e) => {
    setShowMoreIcon(e.currentTarget);
  };
  const closeCategoryMoreBtn = () => {
    setShowMoreIcon(null);
  };

  const handleCategoryInput = () => {
    setCategoryInput(!categoryInput);
  };

  return (
    <Scrollbars style={{ background: "#263238" }}>
      <Box
        sx={{
          maxWidth: 500,
        }}
      >
        <List>
          <ListItem
            disablePadding
            onClick={() => {
              dispatch(
                addNote(
                  "# New note.",
                  "Notes",
                  dayjs().format(),
                  dayjs().format()
                )
              );
              dispatch(addActiveNoteId(notes && notes[0]?.id));
            }}
          >
            <ListItemButton>
              <ListItemIcon sx={{ color: "white" }}>
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText sx={{ color: "white" }} primary="New note" />
            </ListItemButton>
          </ListItem>
        </List>
        <nav aria-label="main mailbox folders">
          <List>


            {navOptions?.map((option) => (
              <ListItem
                disablePadding
                key={option?.id}
                sx={{
                  background: `${
                    option?.name === navOptionActive ? "#7e767665" : ""
                  }`,
                }}
                onClick={() => setNavOptionActive(option?.name)}
              >
                <ListItemButton>
                  <ListItemIcon sx={{ color: "white" }}>
                    {option?.icon}
                  </ListItemIcon>
                  <ListItemText
                    sx={{ color: "white" }}
                    primary={option?.name}
                  />
                </ListItemButton>
              </ListItem>
            ))}


            {/* <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: "white" }}>
                  <BorderColorIcon />
                </ListItemIcon>
                <ListItemText sx={{ color: "white" }} primary="Scratchpad" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: "white" }}>
                  <BookIcon />
                </ListItemIcon>
                <ListItemText sx={{ color: "white" }} primary="Notes" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: "white" }}>
                  <StarBorderIcon />
                </ListItemIcon>
                <ListItemText sx={{ color: "white" }} primary="Favorites" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: "white" }}>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText sx={{ color: "white" }} primary="Trash" />
              </ListItemButton>
            </ListItem> */}


          </List>
        </nav>
        <Divider />

        <Box
          sx={{
            display: "flex",
            itemsCenter: "center",
            justifyContent: "space-between",
          }}
        >
          <List sx={{ width: "100%", maxWidth: 500 }}>
            <ListItem
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="categories"
                  onClick={handleCategoryInput}
                >
                  <AddIcon sx={{ color: "white" }} />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton
                role={undefined}
                onClick={handleCategoryFolders}
                dense
              >
                <ListItemIcon>
                  {openCategories ? (
                    <KeyboardArrowDownIcon sx={{ color: "white" }} />
                  ) : (
                    <KeyboardArrowRightIcon sx={{ color: "white" }} />
                  )}
                </ListItemIcon>
                <Typography sx={{ color: "white" }}>CATEGORIES</Typography>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

        <List sx={{ width: "100%", maxWidth: 500 }}>
          {openCategories &&
            noteCategories?.map((category) => {
              return (
                <ListItem
                  key={category?.id}
                  secondaryAction={
                    <>
                      <IconButton
                        edge="end"
                        aria-label="more"
                        key={category?.id}
                        id={category?.id}
                        aria-controls={`${
                          openCategoryMoreBtn ? category?.id : undefined
                        }`}
                        aria-expanded={openCategoryMoreBtn ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={(e) => {
                          setActiveCategoryMoreBtnId(category?.id);
                          showCategoryMoreBtn(e);
                        }}
                      >
                        <MoreHorizIcon
                          sx={{
                            color: "white",
                          }}
                        />
                      </IconButton>

                      {category?.id === activeCategoryMoreBtnId && (
                        <Menu
                          id={category?.id}
                          MenuListProps={{
                            "aria-labelledby": category?.id,
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
                          <MenuItem
                            onClick={() => {
                              setEditCategoryId(category?.id),
                                setEditCategoryInput(category?.category_name);
                              closeCategoryMoreBtn();
                            }}
                          >
                            <BorderColorIcon sx={{ mr: 2 }} />
                            <ListItemText primary="Rename category" />
                          </MenuItem>

                          <MenuItem
                            onClick={() => {
                              dispatch(deleteCategory(category?.id));
                              closeCategoryMoreBtn();
                            }}
                            sx={{
                              backgroundColor: "red",
                              color: "white",
                              "&:hover": { backgroundColor: "red" },
                            }}
                          >
                            <DeleteIcon sx={{ mr: 2 }} />
                            <ListItemText primary="Delete permanently" />
                          </MenuItem>
                        </Menu>
                      )}
                    </>
                  }
                  disablePadding
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: "white",
                    background: `${
                      activeCategoryMoreBtnId === category?.id ? "#3c70eb" : ""
                    }`,
                    // color: `${activeNoteId === note?.id ? "white" : "black"}`,
                  }}
                >
                  <ListItemButton
                    //role={undefined}
                    onClick={() => {
                      setActiveCategoryMoreBtnId(category?.id);
                    }}
                    dense
                  >
                    <ListItemIcon sx={{ m: 0 }}>
                      <FolderOpenIcon
                        sx={{
                          color: "white",
                        }}
                      />
                    </ListItemIcon>

                    {editCategoryId === category?.id ? (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const existedCategory = categories?.find(
                            (category) =>
                              category?.category_name.toLowerCase() ===
                              editCategoryInput.toLowerCase()
                          );
                          if (!editCategoryInput) {
                            return;
                          } else if (existedCategory !== undefined) {
                            setCategoryRenameMsg(
                              `"${editCategoryInput}" category already exists!!`
                            );
                            return;
                          } else {
                            dispatch(
                              renameCategory(category?.id, editCategoryInput)
                            );
                            setEditCategoryId("");
                            setCategoryRenameMsg("");
                          }
                        }}
                      >
                        <input
                          type="text"
                          placeholder="New category..."
                          value={editCategoryInput}
                          onChange={(e) => setEditCategoryInput(e.target.value)}
                          className="categoryInputBox"
                        />
                        <Typography variant="body2" sx={{ color: "#f50909" }}>
                          {categoryRenameMsg}
                        </Typography>
                      </form>
                    ) : (
                      <ListItemText primary={category?.category_name} />
                    )}
                  </ListItemButton>
                </ListItem>
              );
            })}
        </List>

        {categoryInput && (
          <Box sx={{ p: 2, width: "100%" }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const category = categories?.find(
                  (category) =>
                    category?.category_name.toLowerCase() ===
                    categoryInputValue.toLowerCase()
                );
                if (!categoryInputValue) {
                  return;
                } else if (category !== undefined) {
                  setCategoryRenameMsg(
                    `"${categoryInputValue}" category already exists!!`
                  );
                  return;
                } else {
                  dispatch(addCategory(categoryInputValue));
                  setCategoryInputValue("");
                  setCategoryRenameMsg("");
                  handleCategoryInput();
                }
              }}
            >
              <input
                ref={categoryInputValueRef}
                type="text"
                placeholder="New category..."
                value={categoryInputValue}
                onChange={(e) => setCategoryInputValue(e.target.value)}
                className="categoryInputBox"
              />
              <Typography variant="body2" sx={{ color: "#f50909" }}>
                {categoryRenameMsg}
              </Typography>
            </form>
          </Box>
        )}
      </Box>
    </Scrollbars>
  );
};

export default AppSidebar;

{
  /* <Button variant="text" sx={{ p: 2 }} onClick={handleCategoryFolders}>
  {openCategories ? (
      <KeyboardArrowDownIcon sx={{ color: "white" }} />
    ) : (
      <KeyboardArrowRightIcon sx={{ color: "white" }} />
    )}
    <Typography variant="body1" sx={{ ml: 3, color: "white" }}>
      CATEGORIES
    </Typography>
</Button>
<Button sx={{ color: "white" }} onClick={handleCategoryInput}>
  <AddIcon />
</Button> */
}

{
  /* <Box
  key={category?.id}
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    px: 1,
  }}
>
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <FolderOpenIcon sx={{ color: "white" }} />
    {editCategoryId === category?.id ? (
      <Box sx={{ p: 2, width: "100%" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!editCategoryInput) return;
            dispatch(renameCategory(category?.id, editCategoryInput));
            setEditCategoryId("");
          }}
        >
          <input
            type="text"
            placeholder="New category..."
            value={editCategoryInput}
            onChange={(e) => setEditCategoryInput(e.target.value)}
            className="categoryInputBox"
          />
        </form>
      </Box>
    ) : (
      <Typography variant="body2" sx={{ color: "white", ml: 3 }}>
        {category?.category_name}
      </Typography>
    )}
  </Box>
  <Button
    onClick={() => {
      setEditCategoryId(category?.id),
        setEditCategoryInput(category?.category_name);
    }}
    sx={{ color: "blue" }}
  >
    <BorderColorIcon />
  </Button>
</Box>; */
}
