import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, IconButton, Modal } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { DELETE, UPDATE, UPLOAD_FORM_DATA } from '../services/httpClient';
import { AppContext } from "@/context/appContext";

export default function MultiActionAreaCard({ data, update, setUpdate }) {

  const {setSnackbarState,
       setIsLoading,
  } = React.useContext(AppContext);
   const [selectedImage, setSelectedImage] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await DELETE(`/songs/${data.id}`);
      setUpdate(!update);
      console.log('Song deleted:', response);
      
      setSnackbarState({severity:'success', open:true, message: 'Song deleted'});

    } catch (error) {
      console.error('Failed to delete song:', error);
  
      setSnackbarState({severity:'error', open:true, message: 'Failed to delete song'});

    }
    setIsLoading(false);

  };

  const handleFileUpload = (event) => {
   

    const file = event.target.files[0];
    setSelectedImage(file); // Store the selected image file in the state
  };

  const uploadImage = async () => {
    setIsLoading(true);
    try {
      if (!selectedImage) {
        console.error('No image selected');
        return;
      }

      const formData = new FormData();
      formData.append('coverPhoto', selectedImage, selectedImage.name); // Include the file name when appending to FormData
      console.log('Form data:', formData);

      const response = await UPLOAD_FORM_DATA(`/songs/addCoverImage/${data.id}`, formData);
      console.log('Image uploaded:', response);
    ()=>{
  
      setSnackbarState({severity:'success', open:true, message: 'Image uploaded'});

    }

      setUpdate(!update);
      setOpenModal(false); // Close the modal after uploading the image
    } catch (error) {
     
      setSnackbarState({severity:'error', open:true, message: 'Failed to upload image'});

      console.error('Failed to upload image:', error);
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
    backgroundImage: 'linear-gradient(to right, #b716d8, #d126b0)',
    marginTop: '10px',
  };

  const gradient = `linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.9))`;
  return (
    <Card sx={{ maxWidth: 250, maxHeight: 200, backgroundImage:`url(${process.env.NEXT_PUBLIC_BASE_URL}/cover-photos/${data.coverImageURL})`
    , backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Card sx={{ maxWidth: 250, maxHeight: 200, background: `${gradient}` }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.title}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {data.singer}
            </Typography>
            <Typography variant="body2">{data.descriptionOfSong}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={{ display: 'flex', justifyContent: 'center', marginTop: '5%' }}>
          <IconButton>
            <EditNoteIcon fontSize="large" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={handleOpenModal}>
            <AddAPhotoIcon />
          </IconButton>
        </CardActions>
      </Card>

      {/* Image Upload Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#1a1918',border: '2px solid ',borderRadius:"20px", borderColor: ' #b716d8', padding: '1rem', maxWidth: '400px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

    {selectedImage && (
      <div style={{ marginTop: '1rem', width: '100%', height: '100%', overflow: 'hidden' }}>
        <img src={URL.createObjectURL(selectedImage)} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    )}
        <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} id="upload-input" />
    <label htmlFor="upload-input">
      <Button fullWidth component="span" variant="contained" style={buttonStyle}>
        Choose File
      </Button>
    </label>
    <Button  onClick={uploadImage} variant="contained" style={buttonStyle} disabled={!selectedImage}>
      Upload Image
    </Button>
  </div>
</Modal>



    </Card>
  );
}
