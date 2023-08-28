import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  Button,
  TextField,
  Paper,
  Grid,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import Autocomplete from "@mui/material/Autocomplete"; // Import Autocomplete
import { AppContext } from "@/context/appContext";
import { POST, UPLOAD_FORM_DATA } from "../../services/httpClient";
const StoreModal = () => {
  const { storeCategoriesList, setIsLoading, setSnackbarState } =
    useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [storeName, setStoreName] = useState("");
  const [storeCategory, setStoreCategory] = useState(null); // Use null for initial value
  const [storeDescription, setStoreDescription] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const createStore = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("storeName", storeName);
      formData.append("storeCategoryId", storeCategory.id);
      formData.append("storeDescription", storeDescription);
      formData.append("storeImage", files[0]); // Add the image file to FormData

      const response = await UPLOAD_FORM_DATA("/stores", formData);

      if (!response) {
        setSnackbarState({
          severity: "error",
          open: true,
          message: "Failed to create store",
        });
        handleClose();
        throw new Error("Failed to create store");
      }
      setSnackbarState({
        severity: "success",
        open: true,
        message: "store created successfully",
      });
      handleClose();
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      setSnackbarState({
        severity: "error",
        open: true,
        message: "Error while creating store",
      });
      handleClose();
      console.error("Error creating store:", error);
      throw error;
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
  });

  const isSaveButtonDisabled =
    !storeName || !storeCategory || !storeDescription || files.length === 0;
  const buttonStyle = {
    backgroundImage: "linear-gradient(to right, #b716d8, #d126b0)",
    color: "white",
    fontWeight: "bold",
  };

  // Simulated store categories for autocomplete
  const storeCategories = [
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
    { id: 3, name: "Category 3" },
    // ... Add more categories
  ];
  useEffect(() => {}, [storeCategoriesList]);

  return (
    <div>
      <Box display={"flex"} justifyContent={"flex-end"}>
        <Button style={buttonStyle} onClick={handleOpen}>
          Create Store
        </Button>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: 800,
            bgcolor: "#1e1f21",
            color: "white",
            p: 3,
            outline: "none",
            borderRadius: "10px",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box
                {...getRootProps()}
                sx={{
                  border: "2px dashed white",
                  borderRadius: "10px",
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                  height: "100%",
                }}
              >
                <input {...getInputProps()} />
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignContent={"center"}
                >
                  <Typography variant="body1">
                    Drag & Drop an image here
                  </Typography>
                </Box>
                {files.length > 0 && (
                  <div>
                    <img
                      src={URL.createObjectURL(files[0])}
                      alt="Preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: 200,
                        marginTop: 16,
                      }}
                    />
                  </div>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Store Name"
                variant="outlined"
                fullWidth
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                sx={{ mb: 2, background: "transparent" }}
              />
              <Autocomplete
                size="small"
                disablePortal
                id="store-category"
                options={storeCategoriesList}
                getOptionLabel={(option) => option.storeCategoryName}
                value={storeCategory}
                onChange={(event, newValue) => {
                  setStoreCategory(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Store Category"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
              <TextField
                label="Store Description"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={storeDescription}
                onChange={(e) => setStoreDescription(e.target.value)}
                sx={{ mt: "18px", mb: 2, background: "transparent" }}
              />
            </Grid>
          </Grid>
          <Divider sx={{ margin: "10px 0", background: "white" }} />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={createStore}
            disabled={isSaveButtonDisabled}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default StoreModal;
