import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";

import Image from "next/image";
import { UPDATE } from "../services/httpClient";
import { AppContext } from "../context/appContext";

import React, { useContext, useState } from "react";
import { useRouter } from "next/router";

function ChangePassword() {
    const {setIsLoading,  setSnackbarState} = useContext(AppContext);
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");

  const buttonStyle = {
    backgroundImage: "linear-gradient(to right, #b716d8, #d126b0)",
    color: "white",
    fontWeight: "bold",
    marginTop: "20px",
  };
const params={currentPassword,newPassword}
  const handlePasswordChange = async() => {
     setIsLoading(true);
    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match");
    } else {
      //resetPassword
      const response = await UPDATE("/auth/changePassword", params); // Send a POST request to the login API endpoint
 
if (response.error){
      setSnackbarState({
          severity: "error",
          open: true,
          message: "An error occurred while changing the password",
        });
}
    if (response.status===200){
      setSnackbarState({
          severity: "success",
          open: true,
          message:"Password changed Successfully",
        });
          }
      // Make API call to change the password
      // Implement your API logic here
    }
     setIsLoading(false);
  };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10vh" }}
      >
        <div
          style={{
            width: "400px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4">Change Your Password</Typography>
          <TextField
            style={{ marginTop: "60px" }}
            id="current-password"
            label="Current password"
            type="password"
            fullWidth
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            style={{ marginTop: "10px" }}
            id="new-password"
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            style={{ marginTop: "10px" }}
            id="confirm-new-password"
            label="Confirm New Password"
            type="password"
            fullWidth
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            error={error !== ""}
            helperText={error}
          />
          <Button
            style={buttonStyle}
            variant="contained"
            fullWidth
            onClick={handlePasswordChange}
          >
            Change Password
          </Button>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
