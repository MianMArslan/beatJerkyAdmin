import React from 'react';
import { Grid, TextField, Autocomplete, Button, Chip, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SongForm = () => {
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { label: 'The Good, the Bad and the Ugly', year: 1966 },
    { label: 'Fight Club', year: 1999 },
    { label: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  ];

  const buttonStyle = {
       
      
      
    backgroundImage: 'linear-gradient(to right, #b716d8, #d126b0)',
    color: 'white',
    fontWeight: 'bold',
  
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
          <TextField fullWidth size="small" label="Add Song Title" />
        </Grid>
        <Grid sm={6} item>
          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            style={{ backgroundColor: '#1a1918' }}
            renderInput={(params) => <TextField fullWidth {...params} label="Movie" />}
          />
        </Grid>
        <Grid sm={6} item>
          <TextField fullWidth size="small" label="Name of Singer" />
        </Grid>
        <Grid sm={6} item>
          <TextField fullWidth size="small" label="Description of song" />
        </Grid>
        <Grid sm={6} item>
          <Button style={buttonStyle} fullWidth variant="contained">
            Upload Song
          </Button>
        </Grid>
        <Grid sm={6} item>
          <Chip label="  SongName.mp3" variant="outlined" icon={<CheckCircleIcon color="success" />} style={{ width: '100%' }} />
        </Grid>
        <Grid sm={6} item></Grid>
      </Grid>
      <Button style={buttonStyle} fullWidth variant="contained">
        Done
      </Button>
    </>
  );
};

export default SongForm;
