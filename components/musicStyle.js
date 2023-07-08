import { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import SongCardMusicStyle from "./SongCardMusicStyle.js";
import SearchIcon from "@mui/icons-material/Search";
import GernalModal from "./Modal/GernalModal.js";
import { GET, DELETE, UPDATE } from "../services/httpClient.js";
import { AppContext } from "../context/appContext.js";
 import { useRouter } from "next/router.js";
import CloseIcon from '@mui/icons-material/Close';
function MusicStyle() {
  const router=useRouter();
  const {
    modalHandler,
    setModalHandler,
    setIsUpdated,
    isUpdated,
    snackBarMessage,
    showAlert,
    setSnackBarMessage,
    setMusicStyleCategoriesList,
    setModalType,
  } = useContext(AppContext);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [search, setSearch] = useState(false);

  const [list, setList] = useState([]);
  const [update, setUpdate] = useState(false);
const fetchData = async () => {
  try {
    const responseOfCategory = await GET("/musicStyle");
     setMusicStyleCategoriesList(responseOfCategory.data);
    
    // Get the search query parameter from the URL
    const searchQuery = router.query.search || '';

    // Construct the API endpoint URL with the search query parameter
    const endpoint = `/musicStyleSongs?search=${encodeURIComponent(searchQuery)}`;
    
    const response = await GET(endpoint);
    setList(response.songs);
    console.log("Fetched songs:", response.songs);
  } catch (error) {
    console.error("Failed to fetch songs:", error);
  }
};
  function handleChangeSearch(e){
 
 setSearch(e.target.value)
  }
  useEffect(() => {
    fetchData();
  
  }, [isUpdated,router]);
  
  const handleSearch = () => {
    // Perform search logic here
        router.push({
      pathname: router.route,
      query: { search: search, }
    });
  };


  const buttonStyle = {
    backgroundImage: "linear-gradient(to right, #b716d8, #d126b0)",
    color: "white",
    fontWeight: "bold",
  };

  return (
    <>
       <GernalModal
        open={modalHandler}
        close={handleClose}
        type={"musicStyleSongs"}
        update={update}
        setUpdate={setUpdate}
      />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10vh" }}
      >
        <div
          style={{
            width: "600px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <TextField
          onChange={handleChangeSearch}
            label="Search Songs"
            fullWidth
            InputProps={{
              endAdornment: (
                <>
                <IconButton
                 onClick={()=>(router.push(  router.route))}>
                <CloseIcon  />
                  </IconButton>
                <Button
                  variant="contained"
                  style={buttonStyle}
                  endIcon={<SearchIcon />}
                  onClick={handleSearch}
                >
                  Search
                </Button>
                </>
              ),
            }}
          />
        </div>
      </div>

      <Container>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={() => {
              setModalType("musicStyleSongs");
              setModalHandler(true);
            }}
            variant="contained"
            style={buttonStyle}
          >
            Add Music Style Song
          </Button>
        </div>

        <Grid container spacing={1}>
          {list?.map((data) => (
            <Grid mt="50px" item xs={12} sm={4} md={3} lg={3} key={data.id}>
              <SongCardMusicStyle data={data} update={update} setUpdate={setUpdate} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default MusicStyle;
