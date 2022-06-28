import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Divider,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Scrollbars } from "react-custom-scrollbars-2";

const setting_options = [
  {
    id: 1,
    name: "About Take Notes for Dev",
    icon: <EditOutlinedIcon />,
    value: "about",
  },
  {
    id: 2,
    name: "How to write markdown notes",
    icon: <HelpOutlineIcon />,
    value: "help",
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #f3e8e8f4",
  borderRadius: "5px",
  boxShadow: 24,
  //p: 4,
};

const SettingsModal = ({ openSettingsModal, handleSettingsModal }) => {
  const [activeNav, setActiveNav] = useState("about");

  return (
    <Modal
      open={openSettingsModal}
      onClose={handleSettingsModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ display: "flex" }}>
          <List sx={{ width: "50%" }}>
            {setting_options?.map((option) => (
              <ListItem
                key={option?.id}
                disablePadding
                onClick={() => setActiveNav(option?.value)}
                sx={{
                  background: `${
                    option?.value === activeNav ? "#7995e7" : "none"
                  }`,
                  color: `${option?.value === activeNav && "white"}`,
                  "&:hover": {
                    background: "#d7d9df",
                  },
                }}
              >
                <ListItemButton>
                  <ListItemIcon
                    sx={{ color: `${option?.value === activeNav && "white"}` }}
                  >
                    {option?.icon}
                  </ListItemIcon>
                  <ListItemText primary={option?.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider orientation="vertical" flexItem />
          <Scrollbars style={{ height: "65vh" }}>
            <Box sx={{ padding: "2rem" }}>
              {activeNav === "about" && <About />}
              {activeNav === "help" && <MarkdownHelp />}
            </Box>
          </Scrollbars>
        </Box>
      </Box>
    </Modal>
  );
};

export default SettingsModal;

export const About = () => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography id="modal-modal-title" variant="h5" component="h2">
          About Take Notes for Dev
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }} gutterBottom>
          Take Notes for Dev is a minimalist note-taking web app for developers.
          Write in plain text or Markdown in an IDE-like environment.
        </Typography>

        <Typography id="modal-modal-description" sx={{ mt: 2 }} gutterBottom>
          This app has no tracking or analytics and does not retain any user
          data. Notes are persisted in local storage and can be downloaded as
          Markdown files from the data management tab.
        </Typography>

        <Typography id="modal-modal-description" sx={{ mt: 2 }} gutterBottom>
          Take Notes for Dev was created by
          <Link href="https://phanindra.vercel.app/">
            <a target="_blank" style={{ marginLeft: "10px" }}>
              Phanindra Reddy
            </a>
          </Link>
          .
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, width: "10rem" }}
        >
          <Link href="https://github.com/Phanindra-Reddy/next-takenotes">
            <a target="_blank" style={{ marginLeft: "10px", color: "white" }}>
              View Source
            </a>
          </Link>
        </Button>

        <Typography
          id="modal-modal-description"
          sx={{ mt: 5, textAlign: "center", color: "red" }}
          gutterBottom
        >
          ** More setting options will be available in 2<sup>nd</sup> version.
          **
        </Typography>
      </Box>
    </>
  );
};

export const MarkdownHelp = () => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography id="modal-modal-title" variant="h5" component="h2">
          How to write markdown notes
        </Typography>

        <Link href="https://github.github.com/gfm/">
          <a target="_blank" style={{ margin: "1rem 0" }}>
            GitHub Flavored Markdown Spec
          </a>
        </Link>

        <Link href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">
          <a target="_blank" style={{ margin: "1rem 0" }}>
            Adam Pritchard Markdown Cheatsheet
          </a>
        </Link>

        <Link href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax">
          <a target="_blank" style={{ margin: "1rem 0" }}>
            Basic writing and formatting syntax(Github)
          </a>
        </Link>

        <Link href="https://gist.github.com/cuonggt/9b7d08a597b167299f0d">
          <a target="_blank" style={{ margin: "1rem 0" }}>
            Ultimate Markdown Guide
          </a>
        </Link>
      </Box>
    </>
  );
};
