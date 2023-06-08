import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Autocomplete, Grid, TextField,Chip ,IconButton} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SongForm from './SongForm';
import CategoryForm from './CategoryForm';
 
const buttonStyle = {
       
      
      
  backgroundImage: 'linear-gradient(to right, #b716d8, #d126b0)',
  color: 'white',
  fontWeight: 'bold',

 };
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: '#1a1918',
  border: '2px solid ',
  borderColor: ' #b716d8',
  borderRadius:"10px",
  
  boxShadow: 24,
  p: 2,
};
const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
 
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { label: 'The Good, the Bad and the Ugly', year: 1966 },
  { label: 'Fight Club', year: 1999 },
  {
    label: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
];
export default function BasicModal(props) {
  



  const {open,close,type} =props;
 
  return (
    <div>
     
      <Modal
        open={open}
        
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style } >
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={close}>
          <CloseIcon />
        </IconButton>
      </div>
      {

        type=="category"?( <CategoryForm/>):(<SongForm/>)
      }
 

          
        </Box>
      </Modal>
    </div>
  );
}