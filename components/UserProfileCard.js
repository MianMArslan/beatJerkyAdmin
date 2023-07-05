import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, Button } from "@material-ui/core";
import { Chip } from "@mui/material";
import { AppContext } from "../context/appContext";
import { useContext } from "react";
import { UPDATE } from "../services/httpClient"; // Import the POST function from the httpClient

export default function UserProfileCard(props) {
  const { isLoading, setIsLoading, setSnackbarState , isUsersUpdated,
     setIsUsersUpdated, } = useContext(AppContext);
   
  const { data } = props;
  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
    background:
      "linear-gradient(to bottom, rgba(1, 1, 87, 1), rgba(222, 0, 247, 1))",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  async function handleSuspendUser(){
    setIsLoading(true);
      const params = { isDeleted:true };
      const response = await UPDATE(`/users/${data.id}`, params);
      if(response){
          setSnackbarState({
        severity: "success",
        open: true,
        message: "Profile Status Changed",
      });
          setIsLoading(false);
setIsUsersUpdated(!isUsersUpdated);
      return;
        
      }
           setSnackbarState({
        severity: "error",
        open: true,
        message: "An Error Occurred!",
      });
     
    setIsLoading(false);
   }
    async function handleActivateUser(){
    setIsLoading(true);
      const params = { isDeleted:false };
      const response = await UPDATE(`/users/${data.id}`, params);
         if(response){
          setSnackbarState({
        severity: "success",
        open: true,
        message: "Profile Status Changed",
      });
          setIsLoading(false);
setIsUsersUpdated(!isUsersUpdated);
      return;
        
      }
           setSnackbarState({
        severity: "error",
        open: true,
        message: "An Error Occurred!",
      });
     setIsLoading(false);
 

  }

  return (
    <Card sx={{ maxWidth: 250 ,   transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 4px 20px rgba(0, 123, 255, 0.3)",
        },}}>
     
      <CardContent style={cardStyle}>
    
          {data.isDeleted?(<Chip color="error" sx={{ marginBottom:"10px"}} size="small" label="Deleted"/>):(<Chip color="success" sx={{ marginBottom:"10px"}} size="small" label="Active"/>)}
        <Avatar 
        
          alt={data.firstName?data.firstName:"N/A"}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/profile-images/${data.coverImageURL}`}
          sx={{  width: 100, height: 100 }}
        />
        
        <Chip label={data.firstName?` ${data.firstName}  ${data.lastName}`:"N/A"} />
        <Typography variant="body2">Following: 22 | Followers: 250</Typography>

        {data.isDeleted?(<Button onClick={handleActivateUser} style={{ backgroundColor: "#00d438", marginTop: "15px" }}>
          Activate User
        </Button>):(<Button onClick={handleSuspendUser} style={{ backgroundColor: "#c20000", marginTop: "15px" }}>
          Suspend User
        </Button>)}
      </CardContent>
    </Card>
  );
}
