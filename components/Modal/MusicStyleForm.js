import { Alert, Button, Grid, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../../context/appContext.js";
import { POST } from "../../services/httpClient";

 
const MusicStyleForm = () => {
    const {  setModalHandler ,setIsUpdated,isUpdated} = useContext(AppContext);

  const [musicStyleData, setMusicStyleData] = useState({
    musicStyleName: "",
    musicStyleDescription: "",
  });
  const [buttonStatus, setButtonStatus] = useState(false);
  const buttonStyle = {
    marginTop: "10px",
    backgroundImage: "linear-gradient(to right, #b716d8, #d126b0)",
    color: "white",
    fontWeight: "bold",
  };

  const handleSubmit = async () => {
    try {
      const response = await POST("/musicStyle/createMusicStyle", musicStyleData);
      setButtonStatus(true);
      console.log("Response:", response);
      setIsUpdated(!isUpdated);
  
    } catch (error) {
      console.error("Error:", error);
    }
    setTimeout(()=>{
setModalHandler(false);
      },3000)
  };

  const handleInputChange = (e) => {
    setMusicStyleData({
      ...musicStyleData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6">Add Songs Music Style</Typography>
      </div>
      <Grid container mt={2} spacing={2}>
        <Grid sm={12} item>
          <TextField
            fullWidth
            size="small"
            label="musicStyle Name"
            name="musicStyleName"
            value={musicStyleData.musicStyleName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid sm={12} item>
          <TextField
            fullWidth
            size="small"
            label="musicStyle Description"
            name="musicStyleDescription"
            value={musicStyleData.musicStyleDescription}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid sm={6} item></Grid>
      </Grid>
      {buttonStatus ? (
        <Alert variant="filled" severity="success">
          Music Style Added Successfully
        </Alert>
      ) : (
        <Button
          style={buttonStyle}
          onClick={handleSubmit}
          fullWidth
          variant="contained"
        >
          Done
        </Button>
      )}
    </>
  );
};

export default MusicStyleForm;
