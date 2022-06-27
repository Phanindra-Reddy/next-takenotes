import React from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #f3e8e8f4",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const SettingsModal = ({ openSettingsModal, handleSettingsModal }) => {
  return (
    <Modal
      open={openSettingsModal}
      onClose={handleSettingsModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h2">
          About Take Notes for Dev
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }} gutterBottom>
          TakeNote is a minimalist note-taking web app for developers. Write in
          plain text or Markdown in an IDE-like environment.
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

        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
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
    </Modal>
  );
};

export default SettingsModal;
