import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState, useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import {
  Grid,
  TextField,
  Button as MUIButton,
  Typography as MUITypography,
  Alert,
} from "@mui/material";
import { POST } from "../../services/httpClient";
import { AppContext } from "../../context/appContext.js";

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

const CategoryForm = () => {
  const { setModalHandler, setIsUpdated, isUpdated } = useContext(AppContext);

  const [categoryData, setCategoryData] = useState({
    storeCategoryName: "",
    storeCategoryDescription: "",
  });
  const [buttonStatus, setButtonStatus] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await POST(
        "/storeCategory/createCategory",
        categoryData
      );
      setButtonStatus(true);
      setIsUpdated(!isUpdated);
    } catch (error) {
      console.error("Error:", error);
    }
    setTimeout(() => {
      setModalHandler(false);
    }, 3000);
  };

  const handleInputChange = (e) => {
    setCategoryData({
      ...categoryData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <MUITypography variant="h6">Add Store Category</MUITypography>
      </div>
      <Grid container mt={2} spacing={2}>
        <Grid sm={12} item>
          <TextField
            fullWidth
            size="small"
            label="Category Name"
            name="storeCategoryName"
            value={categoryData.storeCategoryName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid sm={12} item>
          <TextField
            fullWidth
            size="small"
            label="Category Description"
            name="storeCategoryDescription"
            value={categoryData.storeCategoryDescription}
            onChange={handleInputChange}
            style={{ marginBottom: "20px" }}
          />
        </Grid>
      </Grid>
      {buttonStatus ? (
        <Alert variant="filled" severity="success">
          Category Added Successfully
        </Alert>
      ) : (
        <MUIButton
          style={buttonStyle}
          onClick={handleSubmit}
          fullWidth
          variant="contained"
        >
          Done
        </MUIButton>
      )}
    </>
  );
};

export default function BasicModal(props) {
  const { modalHandler, setModalHandler } = useContext(AppContext); // Adjust context as needed

  return (
    <div>
      <Modal
        open={modalHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={() => setModalHandler(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <CategoryForm />
        </Box>
      </Modal>
    </div>
  );
}
