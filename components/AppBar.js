import { styled } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { useContext, useState } from "react";
import { AppContext } from "../context/appContext";
import AppBarMenu from "./AppBarMenu";

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "#0d0b0a", // Set the background color to black
  },
}));

function MyAppBar() {
  const { isLoading, setIsLoading } = useContext(AppContext);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    destroyCookie(null, "accessToken"); // Clear the accessToken cookie
    router.push("/login"); // Redirect to the login page
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" style={{ height: 60 }}>
      {" "}
      {/* Set a specific height for the app bar */}
      <Toolbar>
        <div style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
        </div>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item>
            <Button
              onClick={() => {
                router.push("/home");
              }}
              color="inherit"
            >
              Home
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                router.push("/musicStyle");
              }}
              color="inherit"
            >
              Music Style
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                router.push("/category");
              }}
              color="inherit"
            >
              Category
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                router.push("/musicStyleCategory");
              }}
              color="inherit"
            >
              Music Style Category
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={handleMenuClick}
              color="inherit"
              aria-label="store-menu"
              aria-controls="store-menu"
              variant="text"
            >
              Stores
            </Button>
            <StyledMenu
              id="store-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={() => {
                  router.push("/stores");
                  handleMenuClose();
                }}
              >
                Stores
              </MenuItem>
              <MenuItem
                onClick={() => {
                  router.push("/storeCategories");
                  handleMenuClose();
                }}
              >
                Store Categories
              </MenuItem>
            </StyledMenu>
          </Grid>
        </Grid>
        <AppBarMenu />
      </Toolbar>
    </AppBar>
  );
}

export default MyAppBar;
