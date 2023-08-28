import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "#0d0b0a", // Set the background color to black
  },
}));

export default function CustomizedMenus() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    destroyCookie(null, "accessToken"); // Clear the accessToken cookie
    router.push("/login"); // Redirect to the login page
  };
  return (
    <div>
      <IconButton
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <MenuIcon />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            router.push("/users");
          }}
          disableRipple
        >
          Users
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push("/changePassword");
          }}
          disableRipple
        >
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout} disableRipple>
          Logout
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
