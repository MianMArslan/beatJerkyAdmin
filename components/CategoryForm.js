import React from 'react';
import { Grid, TextField, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CategoryForm = () => {
    const buttonStyle = {
       marginTop:"10px",
        backgroundImage: 'linear-gradient(to right, #b716d8, #d126b0)',
        color: 'white',
        fontWeight: 'bold',
      
       }

  const handleClose = () => {
    // Handle close logic
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
   <Typography>Add Songs Category</Typography>
      </div>
      <Grid container mt={2} spacing={2}>
        <Grid sm={12} item>
          <TextField fullWidth size="small" label="Category Name" />
        </Grid>
        <Grid sm={12} item>
          <TextField fullWidth size="small" label="Category Description" />
        </Grid>
    
        
        <Grid sm={6} item></Grid>
      </Grid>
      <Button  style={buttonStyle} fullWidth variant="contained">
        Done
      </Button>
    </>
  );
};

export default CategoryForm;
