import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  IconButton,
  TextField,
  Modal,
  Chip,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { DELETE, UPDATE, UPLOAD_FORM_DATA } from "../services/httpClient";
import { AppContext } from "@/context/appContext";

export default function SongCardMusicStyle({ data, update, setUpdate }) {
  const {
    setSnackbarState,
    setIsLoading,
    setIsUpdated,
    isUpdated,
    setEditModalHandler,
    setEditSongData,
  } = React.useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await DELETE(`/musicStyleSongs/${data.id}`);
      setUpdate(!update);
      console.log("Song deleted:", response);

      setSnackbarState({
        severity: "success",
        open: true,
        message: "Song deleted",
      });
      setIsUpdated(!isUpdated);
    } catch (error) {
      console.error("Failed to delete song:", error);

      setSnackbarState({
        severity: "error",
        open: true,
        message: "Failed to delete song",
      });
    }
    setIsLoading(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(data);
  };

  const handleInputChange = (event) => {
    setEditedData({
      ...editedData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = async () => {
    setIsEditing(false);
    setEditModalHandler(false);
    setEditSongData(null);

    setIsLoading(true);
    try {
      const response = await UPDATE(`/musicStyleSongs/${data.id}`, editedData);
      setUpdate(!update);
      console.log("Song deleted:", response);

      setSnackbarState({
        severity: "success",
        open: true,
        message: "Song deleted",
      });
      setIsUpdated(!isUpdated);
    } catch (error) {
      console.error("Failed to delete song:", error);

      setSnackbarState({
        severity: "error",
        open: true,
        message: "Failed to delete song",
      });
    }
    setIsLoading(false);

    setIsUpdated(!isUpdated);
    setSnackbarState({
      severity: "success",
      open: true,
      message: "Song updated",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditModalHandler(false);
    setEditSongData(null);
  };

 const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file); // Store the selected image file in the state
  };

  const uploadImage = async () => {
    setIsLoading(true);
    try {
      if (!selectedImage) {
        console.error("No image selected");
        return;
      }

      const formData = new FormData();
      formData.append("coverPhoto", selectedImage, selectedImage.name); // Include the file name when appending to FormData
      console.log("Form data:", formData);

      const response = await UPLOAD_FORM_DATA(
        `/musicStyleSongs/addCoverImage/${data.id}`,
        formData
      );
      console.log("Image uploaded:", response);
      () => {
        setSnackbarState({
          severity: "success",
          open: true,
          message: "Image uploaded",
        });
      };

   setIsUpdated(!isUpdated);
      setOpenModal(false); // Close the modal after uploading the image
    } catch (error) {
      setSnackbarState({
        severity: "error",
        open: true,
        message: "Failed to upload image",
      });

      console.error("Failed to upload image:", error);
    }
    setIsLoading(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const buttonStyle = {
    backgroundImage: "linear-gradient(to right, #b716d8, #d126b0)",
    marginTop: "10px",
  };

  const gradient = `linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.9))`;

  return (
    <Card
      sx={{
        width: 250,
        height: 200,
        backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL}/music-style-cover-photos/${data.coverImageURL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 4px 20px rgba(0, 123, 255, 0.3)",
        },
      }}
    >
      <Card sx={{ width: "inherit", height: "inherit", background: `${gradient}` }}>
        {/* <CardActionArea> */}
        {/* <CardContent style={{ paddingBottom: "0px" }}> */}
        {isEditing ? (
          <div>
            <TextField
              fullWidth
              name="title"
              label="Title"
              variant="standard"
              size="small"
              sx={{ backgroundColor: "rgba(1, 2, 46, 0.3)" }}
              value={editedData.title || ""}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              name="singer"
              label="Singer"
              variant="standard"
              size="small"
              sx={{ backgroundColor: "rgba(1, 2, 46, 0.3)" }}
              value={editedData.singer || ""}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              name="descriptionOfSong"
              label="Description"
              variant="standard"
              size="small"
              sx={{ backgroundColor: "rgba(1, 2, 46, 0.3)" }}
              value={editedData.descriptionOfSong || ""}
              onChange={handleInputChange}
            />
          </div>
        ) : (
           <div style={{marginTop:"20px",marginLeft:"10px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
           
<Chip  sx={{
    backgroundColor: "rgba(63, 1, 74, 0.5)",marginTop:"5px" 
  }} label={`Song Title: ${data.title}`} />
             
             
               
            <Chip  sx={{
    backgroundColor: "rgba(63, 1, 74, 0.5)",marginTop:"5px"  
  }} label={` Singer: ${data.singer}`} />
     <Chip  sx={{
    backgroundColor: "rgba(63, 1, 74, 0.5)", marginTop:"5px" 
  }} label={`Description: ${data.descriptionOfSong}`} />
           </div>
        )}
        {/* </CardContent> */}
        {/* </CardActionArea> */}
        {/* <CardActions
          style={{
            paddingTop: "0px",
            display: "flex",
            justifyContent: "center",
            marginTop: "0%",
          }}
        > */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
          {isEditing ? (
            <>
              <Button variant="outlined" fullWidth size="small" color="success" onClick={handleSave}>
                Update
              </Button>
              {/* <IconButton  color="primary" onClick={handleSave}>
                <CheckCircleIcon fontSize="small"   />
              </IconButton> */}
              {/* <IconButton onClick={handleCancel}>
                <DeleteIcon />
              </IconButton> */}
            </>
          ) : (
            <></>
          )}
          {!isEditing && (
            <>
              {!isEditing && (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
                  <IconButton onClick={handleEdit}>
                    <EditNoteIcon fontSize="large" />
                  </IconButton>
                  <IconButton onClick={handleDelete}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={handleOpenModal}>
                    <AddAPhotoIcon />
                  </IconButton>
                </div>
              )}
            </>
          )}
        </div>
        {/* </CardActions> */}
      </Card>

      {/* Image Upload Modal */}
          <Modal open={openModal} onClose={handleCloseModal}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#1a1918",
            border: "2px solid ",
            borderRadius: "20px",
            borderColor: " #b716d8",
            padding: "1rem",
            maxWidth: "400px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {selectedImage && (
            <div
              style={{
                marginTop: "1rem",
                width: "100%",
                height: "100%",
                overflow: "hidden",
              }}
            >
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: "none" }}
            id="upload-input"
          />
          <label htmlFor="upload-input">
            <Button
              fullWidth
              component="span"
              variant="contained"
              style={buttonStyle}
            >
              Choose File
            </Button>
          </label>
          <Button
            onClick={uploadImage}
            variant="contained"
            style={buttonStyle}
            disabled={!selectedImage}
          >
            Upload Image
          </Button>
        </div>
      </Modal>
    </Card>
  );
}
