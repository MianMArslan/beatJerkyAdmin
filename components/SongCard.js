import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, IconButton } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
export default function MultiActionAreaCard() {
    const buttonStyle = {
        backgroundImage: 'linear-gradient(to right, #b716d8, #d126b0)',
         
         
        marginTop:"10px"
       };
    const gradient = `linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.9))`;
  return (
    <Card   sx={{ maxWidth: 250 ,maxHeight:200, backgroundImage:'url("https://thumbs.dreamstime.com/b/dynamic-radial-color-sound-equalizer-design-music-album-cover-template-abstract-circular-digital-data-form-vector-160916775.jpg")' ,backgroundSize: 'cover',
    backgroundPosition: 'center',}}>
        <Card     sx={{
            maxWidth: 250 ,maxHeight:200,
        background: `${gradient}`,
        
        
      }}>

        
      <CardActionArea>
     
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body1"  >
        Category Title
             
          </Typography>
          <Typography variant="body2"  >
            Lizards are a widespread group of squamate reptiles, with over 6,000
             
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{display: "flex", justifyContent:"center" ,marginTop:"5%"}}>
        <IconButton >
            <EditNoteIcon  fontSize='large'/>
        </IconButton>
  
        <IconButton >
            < DeleteIcon
             
             />
        </IconButton>
       
        <IconButton >
            < AddAPhotoIcon
             
             />
        </IconButton>
      </CardActions>
      </Card>
    </Card>
  );
}