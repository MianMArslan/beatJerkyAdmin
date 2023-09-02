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
import { useRouter } from "next/router";
const FeedModal = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { storeCategoriesList, setIsLoading, setSnackbarState } =
    useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const router = useRouter();
  const [feedDescription, setFeedDescription] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const createStore = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      formData.append("description", feedDescription);
      formData.append("storeId", router.query.storeId);
      formData.append("userId", userData.userId);

      formData.append("feed", files[0]);

      const response = await UPLOAD_FORM_DATA("/feed", formData);

      if (!response) {
        setSnackbarState({
          severity: "error",
          open: true,
          message: "Failed to create store",
        });
        handleClose();
        throw new Error("Failed to create feed");
      }
      setSnackbarState({
        severity: "success",
        open: true,
        message: "feed created successfully",
      });
      handleClose();
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      setSnackbarState({
        severity: "error",
        open: true,
        message: "Error while creating feed",
      });
      handleClose();
      console.error("Error creating feed:", error);
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

  const isSaveButtonDisabled = !feedDescription || files.length === 0;
  const buttonStyle = {
    backgroundImage: "linear-gradient(to right, #b716d8, #d126b0)",
    color: "white",
    fontWeight: "bold",
  };

  useEffect(() => {}, [storeCategoriesList]);

  return (
    <div>
      <Box display={"flex"} justifyContent={"flex-end"}>
        <Button style={buttonStyle} onClick={handleOpen}>
          Create Feed
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
            maxWidth: 600,
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
                label="feed Description"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={feedDescription}
                onChange={(e) => setFeedDescription(e.target.value)}
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

export default FeedModal;
