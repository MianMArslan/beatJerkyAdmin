import React, { useState, useEffect, useContext } from 'react';
import { Grid, TextField, Autocomplete, Button, CircularProgress, Typography, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { POST, UPLOAD_FORM_DATA } from '../../services/httpClient';
import { AppContext } from "@/context/appContext";

const SongForm = () => {
  const {
    modalHandler, setModalHandler,setAlert
  } = useContext(AppContext);
  const categories = [
    { label: 'Category 1', id: 1 },
    { label: 'Category 2', id: 2 },
    { label: 'Category 3', id: 3 },
    // Add more category options as needed
  ];

  const buttonStyle = {
    backgroundImage: 'linear-gradient(to right, #b716d8, #d126b0)',
    color: 'white',
    fontWeight: 'bold',
    marginTop: '10px',
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    opacity: 0.5,
    cursor: 'not-allowed',
  };

  const [uploading, setUploading] = useState(false);
  const [songData, setSongData] = useState({
    title: '',
    categories: null,
    singer: '',
    descriptionOfSong: '',
    year: '',
    file: null,
  });
  const [isFormValid, setFormValid] = useState(false);

  useEffect(() => {
    // Check if all fields are filled and a file is selected
    const isFormValid =
      songData.title !== '' &&
      songData.categories !== null &&
      songData.singer !== '' &&
      songData.descriptionOfSong !== '' &&
      songData.year !== '' &&
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
    setSongData({
      ...songData,
      categories: value.label,
    });
  };

  const handleFileInputChange = (event) => {
    setSongData({
      ...songData,
      file: event.target.files[0],
    });
  };

  const handleUpload = async () => {
    if (!songData.file) {
      console.error('No file selected');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', songData.file);
      formData.append('title', songData.title);
      formData.append('categories', JSON.stringify(songData.categories));
      formData.append('singer', songData.singer);
      formData.append('descriptionOfSong', songData.descriptionOfSong);
      formData.append('year', songData.year);

      // Upload the song file and send the data together
      const createResponse = await UPLOAD_FORM_DATA('/songs', formData);

      if (createResponse.error) {
        console.error('Failed to create song:', createResponse.error);
        return;
        setAlert({
          severity: 'error',
          title: 'Error!',
          message: 'Failed to create song....',
        });
      }

      console.log('Song created successfully:', createResponse);
      setAlert({
        severity: 'success',
        title: 'Success!',
        message: 'Song created successfully',
      });
      // Reset the form data
      setSongData({
        title: '',
        categories: null,
        singer: '',
        descriptionOfSong: '',
        year: '',
        file: null,
      });
    } catch (error) {
      console.log("🚀 ~ file: SongForm.js:123 ~ handleUpload ~ error:", error)
      setAlert({
        severity: 'error',
        title: 'Error!',
        message: 'An error occurred:',
      });
      console.error('An error occurred:', error);
    } finally {
      setUploading(false);
    }
    setModalHandler(false);
   
  };

  const handleClose = () => {
    // Handle close logic
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
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
            options={categories}
            getOptionLabel={(option) => option.label}
            style={{ backgroundColor: '#1a1918' }}
            renderInput={(params) => <TextField fullWidth {...params} label="Categories" />}
            value={songData.categories}
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
          <Button style={buttonStyle} fullWidth variant="contained" component="label">
            {uploading ? (
              <>
                <CircularProgress size={20} style={{ marginRight: 10 }} />
                Uploading...
              </>
            ) : (
              'Upload Song'
            )}
            <input type="file" accept=".mp3" hidden onChange={handleFileInputChange} />
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
            <Alert style={{ backgroundColor: '#00c264' }} severity="success">
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

export default SongForm;
