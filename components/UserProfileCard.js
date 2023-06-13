import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, Button } from '@material-ui/core';

export default function UserProfileCard(props) {
  const{data}=props
  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    background: 'linear-gradient(to bottom, rgba(1, 1, 87, 1), rgba(222, 0, 247, 1))',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardContent style={cardStyle}>
        <Avatar
          alt="Remy Sharp"
          src="https://i.pravatar.cc/300"
          sx={{ width: 100, height: 100 }}
        />
        <Typography gutterBottom variant="h5" component="div">
          {data.firstName}{''} {data.lastName}

        </Typography>
        <Typography variant="body2"  >
          Following: 22 | Followers: 250
        </Typography>



        <Button style={{backgroundColor:"#f75b00" ,marginTop:"15px"}} >Disable User</Button>
      </CardContent>
      
    </Card>
  );
}
