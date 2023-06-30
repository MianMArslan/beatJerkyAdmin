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

import SongCard from "../SongCard.js";
import SearchIcon from "@mui/icons-material/Search";

import { useState, useContext } from "react";
import CategoryTable from "./CategoryTable.js";
import GernalModal from "../Modal/GernalModal.js";
import { useEffect } from "react";
import { AppContext } from "../../context/appContext";
function Category() {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);

  const { modalHandler, setModalHandler,setModalType } = useContext(AppContext);

  const handleClose = () => {
    setOpen(false);
    setUpdate(!update);
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
        setUpdate={setUpdate}
      />

      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5vh",
          }}
        >
          <Typography variant="h5">Songs Categories</Typography>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "5vh",
          }}
        >
          <Button
            onClick={() => {setModalType("category");setModalHandler(true);}}
            variant="contained"
            style={buttonStyle}
          >
            Add Category
          </Button>
        </div>

        <CategoryTable update={update} />
      </Container>
    </>
  );
}

export default Category;
