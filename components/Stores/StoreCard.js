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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete"; // Import the DeleteIcon
import { DELETE, GET, UPDATE, UPLOAD_FORM_DATA } from "@/services/httpClient";
import { useRouter } from "next/router"; // Import the useRouter
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import axios from "axios";
export default function ActionAreaCard({
  storeName: initialStoreName,
  storeDescription: initialStoreDescription,
  storeImage,
  id,
  isUpdated,
  setIsUpdated,
}) {
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
    try {
      const response = await UPDATE(`/stores/${id}`, {
        storeName,
        storeDescription,
      });
      // You can handle successful save and close the dialog here.
      setIsEditing(false);
      setIsUpdated(!isUpdated);
    } catch (error) {
      // Handle the error
    }
  };

  const handleDeleteClick = async () => {
    // Call the onDelete callback to trigger the delete action
    try {
      const response = await GET(`/products/${id}`);
      if (!response?.products?.length) {
        const resp = await DELETE(`/stores/${id}`);
        setIsUpdated(!isUpdated);
      }
    } catch (error) {
      console.error("Failed to fetch songs:", error);
    }
    // onDelete(id);
  };

  const handleCardClick = () => {
    // Check if the card is in edit mode, and prevent the click event
    if (!isEditing) {
      router.push(
        `/selectedStore/products?storeId=${id}&&storeName=${storeName}&&storeImage=${storeImage}`
      );
    }
  };
  const handleImageUpdate = async () => {
    try {
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
            const response = await UPLOAD_FORM_DATA(
              `/stores/updateImage/${id}`,
              formData
            );
            // Assuming you have the correct endpoint path and the server is running

            if (response.status === 200) {
              // Image updated successfully, you may want to reload the card or update the image URL.
              console.log("Image updated successfully");
              // You can update the image in your UI here.
            } else {
              console.error("Failed to update image");
            }
          } catch (error) {
            console.error("Error updating image:", error);
          }
        }
      });
      setIsUpdated(!isUpdated);
      fileInput.click();
    } catch (error) {
      console.error("Error creating file input:", error);
    }
  };

  return (
    <Card
      sx={{
        mt: "20px",
        borderRadius: "10px",
        width: 350,
        height: isEditing ? 300 : 250,
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
              <Typography gutterBottom variant="h6">
                {storeName}
              </Typography>
              <Typography variant="body2" mt={-1}>
                {storeDescription}
              </Typography>
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
