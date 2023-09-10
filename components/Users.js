import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Container, Grid, IconButton, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import { GET } from "../services/httpClient";
import UserProfileCard from "./UserProfileCard.js";

function Users() {
  const [search, setSearch] = useState(false);

  const router = useRouter();
  const {
    isLoading,
    setIsLoading,
    setSnackbarState,
    isUsersUpdated,
    setIsUsersUpdated,
  } = useContext(AppContext);

  const [list, setList] = useState([]);
  const handleSearch = () => {
    router.push({
      pathname: router.route,
      query: { search: search },
    });
  };
  const fetchData = async () => {
    try {
      // Get the search query parameter from the URL
      const searchQuery = router.query.search || "";

      // Construct the API endpoint URL with the search query parameter
      const endpoint = `/users?search=${encodeURIComponent(searchQuery)}`;

      const response = await GET(endpoint);
      setList(response.data);
      console.log("Fetched users:", response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  function handleChangeSearch(e) {
    setSearch(e.target.value);
  }
  useEffect(() => {
    fetchData();
  }, [isUsersUpdated, router]);
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
                  <IconButton onClick={() => router.push(router.route)}>
                    <CloseIcon />
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
