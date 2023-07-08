import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Autocomplete, Grid, TextField, Chip, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SongForm from "./SongForm";
import CategoryForm from "./CategoryForm";
import { AppContext } from "../../context/appContext";
import { useContext } from "react";
import MusicStyleForm from "./MusicStyleForm";
import MusicStyleSongForm from "./MusicStyleSongForm"
const buttonStyle = {
  backgroundImage: "linear-gradient(to right, #b716d8, #d126b0)",
  color: "white",
  fontWeight: "bold",
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#1a1918",
  border: "2px solid ",
  borderColor: " #b716d8",
  borderRadius: "10px",

  boxShadow: 24,
  p: 2,
};
 
export default function BasicModal(props) {
  const { modalHandler, modalType, setModalType,setModalHandler } = useContext(AppContext);
 
  const {   update, setUpdate } = props;

  return (
    <div>
      <Modal
        open={modalHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              onClick={() => {
                setModalHandler(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
          {modalType == "category" ? <CategoryForm /> : modalType=="MusicStyle"?<MusicStyleForm/>:modalType=="musicStyleSongs" ?<MusicStyleSongForm />:modalType=="songs" ?<SongForm />:<></>}
        </Box>
      </Modal>
    </div>
  );
}
