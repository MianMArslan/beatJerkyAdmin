import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  CardActionArea,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete"; // Import the DeleteIcon
import { DELETE, GET, UPDATE, UPLOAD_FORM_DATA } from "@/services/httpClient";
import { useRouter } from "next/router"; // Import the useRouter
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import axios from "axios";
import { AppContext } from "@/context/appContext";
export default function ActionAreaCard({
  storeName: initialStoreName,
  storeDescription: initialStoreDescription,
  storeImage,
  id,
  isUpdated,
  setIsUpdated,
  isImageUpdated,
  setIsImageUpdated,
}) {
  const { isLoading, setIsLoading, setSnackbarState } =
    React.useContext(AppContext);
  const [isEditing, setIsEditing] = React.useState(false);
  const [storeName, setStoreName] = React.useState(initialStoreName);
  const [storeDescription, setStoreDescription] = React.useState(
    initialStoreDescription
  );

  const router = useRouter(); // Initialize the router

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsLoading(true);
    try {
      const response = await UPDATE(`/stores/${id}`, {
        storeName,
        storeDescription,
      });
      setSnackbarState({
        severity: "success",
        open: true,
        message: "store updated successfully",
      });
      setIsEditing(false);
      setIsUpdated(!isUpdated);
    } catch (error) {
      setSnackbarState({
        severity: "error",
        open: true,
        message: "Failed to updated store",
      });
    }
    setIsLoading(false);
  };

  const handleDeleteClick = async () => {
    setIsLoading(true);

    // Call the onDelete callback to trigger the delete action
    try {
      const response = await GET(`/products/${id}`);
      const feedResponse = await GET(`/feed/storeFeed?storeId=${id}`);

      console.log(
        "🚀 ~ file: StoreCard.js:80 ~ handleDeleteClick ~ feedResponse:",
        feedResponse
      );

      if (!response?.products?.length && !feedResponse?.data?.length) {
        const resp = await DELETE(`/stores/${id}`);
        setIsUpdated(!isUpdated);
        setSnackbarState({
          severity: "success",
          open: true,
          message: "Store deleted successfully",
        });
      } else {
        setSnackbarState({
          severity: "warning",
          open: true,
          message: "First Delete Store Products And Store Feeds",
        });
      }
    } catch (error) {
      setSnackbarState({
        severity: "error",
        open: true,
        message: "Failed to delete store",
      });
    }
    setIsLoading(false);

    // onDelete(id);
  };

  const handleCardClick = () => {
    // Check if the card is in edit mode, and prevent the click event
    setIsLoading(true);

    if (!isEditing) {
      router.push(
        `/selectedStore/products?storeId=${id}&&storeName=${storeName}&&storeImage=${storeImage}`
      );
      setIsLoading(false);
    }
  };
  const handleImageUpdate = async () => {
    setIsLoading(true);

    try {
      setIsLoading(true);
      // Open a file input dialog
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.addEventListener("change", async (e) => {
        const file = e.target.files[0];
        if (file) {
          const formData = new FormData();
          formData.append("storeImage", file);

          try {
            setIsLoading(true);
            const response = await UPLOAD_FORM_DATA(
              `/stores/updateImage/${id}`,
              formData
            );

            if (response.status === 200) {
              setIsImageUpdated(!isImageUpdated);
              console.log("Image updated successfully");
              setSnackbarState({
                severity: "success",
                open: true,
                message: "Image updated successfully",
              });
              setIsLoading(false);
              setIsUpdated(!isUpdated);
            } else {
              setSnackbarState({
                severity: "error",
                open: true,
                message: "Failed to update image",
              });
              console.error("Failed to update image");
              setIsLoading(false);
            }
            setIsImageUpdated(!isImageUpdated);
          } catch (error) {
            setSnackbarState({
              severity: "error",
              open: true,
              message: `Error updating image: ${error}`,
            });
            console.error("Error updating image:", error);
            setIsLoading(false);
          }
        }
      });

      fileInput.click();
    } catch (error) {
      setSnackbarState({
        severity: "error",
        open: true,
        message: `Error creating file input: ${error}`,
      });
      console.error("Error creating file input:", error);
    }
    setIsLoading(false);
  };

  return (
    <Card
      sx={{
        mt: "20px",
        borderRadius: "10px",
        width: 350,
        minHeight: isEditing ? 320 : 270,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 4px 20px rgba(0, 123, 255, 0.3)",
        },
        backgroundImage: "linear-gradient(to right, #b716d8, #d126b0)",
        cursor: isEditing ? "default" : "pointer", // Change cursor style based on edit mode
      }}
    >
      <CardActionArea>
        <CardMedia
          onClick={handleCardClick}
          component="img"
          height="150"
          image={`${process.env.NEXT_PUBLIC_BASE_URL}${storeImage?.replace(
            "public",
            ""
          )}`}
          alt="green iguana"
        />
        <CardContent sx={{ padding: "5px" }}>
          {!isEditing ? (
            <>
              <Box display={"flex"} flexDirection={"column"}>
                <Chip label={storeName} />
                <Chip label={storeDescription} />
              </Box>
            </>
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="stretch"
              justifyContent="space-between"
              height="100%"
            >
              <TextField
                size="small"
                variant="outlined"
                label="Store Name"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                sx={{ marginBottom: "10px" }}
              />
              <TextField
                size="small"
                variant="outlined"
                label="Store Description"
                multiline
                value={storeDescription}
                onChange={(e) => setStoreDescription(e.target.value)}
                sx={{ flexGrow: 1 }}
              />
              <Button
                style={{ marginTop: 8 }}
                onClick={handleSaveClick}
                variant="contained"
                color="success"
              >
                Save
              </Button>
            </Box>
          )}
          {!isEditing ? (
            <Box display={"flex"} justifyContent={"center"}>
              <IconButton onClick={handleEditClick}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleDeleteClick}>
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={handleImageUpdate}>
                <CameraAltIcon />
              </IconButton>
            </Box>
          ) : null}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
