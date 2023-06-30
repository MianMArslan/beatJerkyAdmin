import {
  Box,
  Button,
  ButtonGroup,
  Container,
  CssBaseline,
  Grid,
  TextField,  
  Typography,
} from "@mui/material";

 

import { useState, useContext } from "react";
import MusicStyleTable from "./MusicStyleTable.js";
import GernalModal from "../Modal/GernalModal.js";
import { useEffect } from "react";
import { AppContext } from "../../context/appContext.js";
function MusicStyle() {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);

  const { modalHandler, setModalHandler ,setModalType,setIsUpdated,isUpdated} = useContext(AppContext);

  const handleClose = () => {
    setOpen(false);
    setIsUpdated(!isUpdated);
  };
  useEffect(() => {}, [open]);

  const buttonStyle = {
    backgroundImage: "linear-gradient(to right, #b716d8, #d126b0)",
    color: "white",
    fontWeight: "bold",
  };
  return (
    <>
      <GernalModal
        open={modalHandler}
        close={handleClose}
        
        update={update}
        setUpdate={setIsUpdated}
      />

      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5vh",
          }}
        >
          <Typography variant="h5">Music Styles</Typography>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "5vh",
          }}
        >
          <Button
            onClick={() => {setModalType("MusicStyle");setModalHandler(true);}}
            variant="contained"
            style={buttonStyle}
          >
            Add Music Style
          </Button>
        </div>

        <MusicStyleTable update={update} />
      </Container>
    </>
  );
}

export default MusicStyle;
