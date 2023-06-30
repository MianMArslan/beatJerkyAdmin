import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  TextField,
  Autocomplete,
  Button,
  CircularProgress,
  Typography,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { POST, UPLOAD_FORM_DATA, GET } from "../../services/httpClient";
import { AppContext } from "@/context/appContext";

const MusicStyleSongForm = () => {
  const { musicStyleCategoriesList, setSnackbarState, setModalHandler ,setIsUpdated,isUpdated} =
    useContext(AppContext);

  const buttonStyle = {
    backgroundImage: "linear-gradient(to right, #b716d8, #d126b0)",
    color: "white",
    fontWeight: "bold",
    marginTop: "10px",
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    opacity: 0.5,
    cursor: "not-allowed",
  };

  const [uploading, setUploading] = useState(false);
  const [songData, setSongData] = useState({
    title: "",
    songCategoryID: null,
    singer: "",
    descriptionOfSong: "",
    year: "",
    file: null,
  });
  const [isFormValid, setFormValid] = useState(false);

  useEffect(() => {
    // Check if all fields are filled and a file is selected
    const isFormValid =
      songData.title !== "" &&
      songData.songCategoryID !== null &&
      songData.singer !== "" &&
      songData.descriptionOfSong !== "" &&
      songData.year !== "" &&
      songData.file !== null;

    setFormValid(isFormValid);
  }, [songData]);

  const handleInputChange = (event) => {
    setSongData({
      ...songData,
      [event.target.name]: event.target.value,
    });
  };

  const handleAutocompleteChange = (event, value) => {
    // setSongData({
    //   ...songData,
    //   songCategoryID: value.label,
    // });
    if (value) {
      setSongData({
        ...songData,
        songCategoryID: value.id,
      });
    }
  };

  const handleFileInputChange = (event) => {
    setSongData({
      ...songData,
      file: event.target.files[0],
    });
  };

  const handleUpload = async () => {
    if (!songData.file) {
      console.error("No file selected");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", songData.file);
      formData.append("title", songData.title);
      formData.append(
        "songCategoryID",
        JSON.stringify(songData.songCategoryID)
      );
      formData.append("singer", songData.singer);
      formData.append("descriptionOfSong", songData.descriptionOfSong);
      formData.append("year", songData.year);

      // Upload the song file and send the data together
      const createResponse = await UPLOAD_FORM_DATA("/musicStyleSongs", formData);

      if (createResponse.error) {
        console.error("Failed to create song:", createResponse.error);
        setSnackbarState({
          severity: "error",
          open: true,
          message: "Failed to create song",
        });

        return;
      }
    console.log("🚀 ~ file: MusicStyleSongForm.js:18 ~ MusicStyleSongForm ~ musicStyleCategoriesList:", musicStyleCategoriesList)

      console.log("Song created successfully:", createResponse);
      setSnackbarState({
        severity: "success",
        open: true,
        message: "Song created successfully",
      });
setIsUpdated(!isUpdated);
      // Reset the form data
      setSongData({
        title: "",
        songCategoryID: null,
        singer: "",
        descriptionOfSong: "",
        year: "",
        file: null,
      });
    } catch (error) {
      setSnackbarState({
        severity: "error",
        open: true,
        message: "An error occurred:",
      });

      console.error("An error occurred:", error);
    } finally {
      setUploading(false);
    }
    setModalHandler(false);
  };

  

  return (
    <>
  
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography>Add Song</Typography>
      </div>
      <Grid container mt={2} spacing={2}>
        <Grid sm={6} item>
          <TextField
            fullWidth
            size="small"
            label="Add Song Title"
            name="title"
            value={songData.title}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid sm={6} item>
          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={musicStyleCategoriesList}
  getOptionLabel={(option) => option.musicStyleName || ""}
            style={{ backgroundColor: "#1a1918" }}
            renderInput={(params) => (
              <TextField fullWidth {...params} label="Select Music Style Category" />
            )}
            // value={selectedCategory} will be used in edit song // Assuming you have a state variable to store the selected category ID
            onChange={handleAutocompleteChange}
          />
        </Grid>
        <Grid sm={6} item>
          <TextField
            fullWidth
            size="small"
            label="Name of Singer"
            name="singer"
            value={songData.singer}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid sm={6} item>
          <TextField
            fullWidth
            size="small"
            label="Description of song"
            name="descriptionOfSong"
            value={songData.descriptionOfSong}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid sm={6} item>
          <Button
            style={buttonStyle}
            fullWidth
            variant="contained"
            component="label"
          >
            {uploading ? (
              <>
                <CircularProgress size={20} style={{ marginRight: 10 }} />
                Uploading...
              </>
            ) : (
              "Upload Song"
            )}
            <input
              type="file"
              accept=".mp3"
              hidden
              onChange={handleFileInputChange}
            />
          </Button>
        </Grid>
        <Grid sm={6} item>
          <TextField
            fullWidth
            size="small"
            label="Year of release"
            name="year"
            value={songData.year}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid sm={12} item>
          {songData.file ? (
            <Alert style={{ backgroundColor: "#00c264" }} severity="success">
              {songData.file.name}
            </Alert>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
      <Button
        style={isFormValid ? buttonStyle : disabledButtonStyle}
        fullWidth
        variant="contained"
        onClick={handleUpload}
        disabled={!isFormValid || uploading}
      >
        Done
      </Button>
    </>
  );
};

export default MusicStyleSongForm;
