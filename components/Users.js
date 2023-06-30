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
import styles from "./login.module.css";
import theme from "../themes/theme.js";
import Image from "next/image";
import { display } from "@material-ui/system";
import { ThemeProvider } from "@emotion/react";
import UserProfileCard from "./UserProfileCard.js";
import SearchIcon from "@mui/icons-material/Search";
import { GET, DELETE, UPDATE } from "../services/httpClient";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from "next/router";

function Users() {
    const [search, setSearch] = useState(false);

  const router=useRouter();
    const { isLoading, setIsLoading, setSnackbarState , isUsersUpdated,
     setIsUsersUpdated, } = useContext(AppContext);

  const [list, setList] = useState([]);
  const handleSearch = () => {
   
        router.push({
      pathname: router.route,
      query: { search: search, }
    });
  };
const fetchData = async () => {
  try {
    // Get the search query parameter from the URL
    const searchQuery = router.query.search || '';

    // Construct the API endpoint URL with the search query parameter
    const endpoint = `/users?search=${encodeURIComponent(searchQuery)}`;

    const response = await GET(endpoint);
    setList(response.data);
    console.log("Fetched users:", response.data);
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};
  function handleChangeSearch(e){
 
 setSearch(e.target.value)
  }
  useEffect(() => {
    fetchData();
  }, [isUsersUpdated,router]);
  const buttonStyle = {
    backgroundImage: "linear-gradient(to right, #b716d8, #d126b0)",
    color: "white",
    fontWeight: "bold",
  };
  return (
    <>
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
            label="Search User"
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
        <Grid container spacing={1}>
          {list.map((data) => (
            <Grid mt="50px" item xs={12} sm={4} md={3} lg={3} key={data}>
              <UserProfileCard data={data} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Users;
