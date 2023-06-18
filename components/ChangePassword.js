import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";

import Image from "next/image";

import React, { useState } from "react";
import { useRouter } from "next/router";

function ChangePassword() {
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

  const handlePasswordChange = () => {
    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match");
    } else {
      // Make API call to change the password
      // Implement your API logic here
    }
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
