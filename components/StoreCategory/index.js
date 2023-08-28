import { Button, Container, Typography } from "@mui/material";

// import SongCard from "../SongCard.js";
// import SearchIcon from "@mui/icons-material/Search";

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/appContext.js";
import StoreCategoryTable from "./StoreCategoryTable.js";
import StoreCategoryModal from "./StoreCategoryModal.js";
function Category() {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);

  const { modalHandler, setModalHandler, setModalType } =
    useContext(AppContext);

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
      <StoreCategoryModal
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
          <Typography variant="h5">Store Categories</Typography>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "5vh",
          }}
        >
          <Button
            onClick={() => {
              setModalType("category");
              setModalHandler(true);
            }}
            variant="contained"
            style={buttonStyle}
          >
            Add Store Category
          </Button>
        </div>

        <StoreCategoryTable update={update} />
      </Container>
    </>
  );
}

export default Category;
