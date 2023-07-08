import { Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { POST_WITHOUT_TOKEN, UPDATE } from "../services/httpClient";
import { AppContext } from "../context/appContext";
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";

function ResetPassword() {
  const { setIsLoading, setSnackbarState } = useContext(AppContext);
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  
  const buttonStyle = {
    backgroundImage: "linear-gradient(to right, #b716d8, #d126b0)",
    color: "white",
    fontWeight: "bold",
    marginTop: "20px",
  };
  
  const handlePasswordReset = async () => {
    setIsLoading(true);
    
    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }
    
    const params = { password:newPassword,token:router.query.token };
    
    try {
      const response = await POST_WITHOUT_TOKEN("/auth/resetPassword", params);
      
      if (response.error) {
        setSnackbarState({
          severity: "error",
          open: true,
          message: "An error occurred while resetting the password",
        });
      } else if (response.status === "success") {
        setSnackbarState({
          severity: "success",
          open: true,
          message: "Password reset successfully",
        });
        
       }
    } catch (error) {
      console.error(error);
      setSnackbarState({
        severity: "error",
        open: true,
        message: "An error occurred while resetting the password",
      });
    }
    
    setIsLoading(false);
  };
  
  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    setError("");
  };
  
  const handleConfirmPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
    setError("");
  };
  
  const isButtonDisabled = newPassword === "" || confirmNewPassword === "";
  
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "10vh" }}>
        <div style={{ width: "400px", display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center" }}>
          <Typography variant="h4">Reset Your Password</Typography>
          <TextField
            style={{ marginTop: "60px" }}
            id="new-password"
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={handlePasswordChange}
          />
          <TextField
            style={{ marginTop: "10px" }}
            id="confirm-new-password"
            label="Confirm New Password"
            type="password"
            fullWidth
            value={confirmNewPassword}
            onChange={handleConfirmPasswordChange}
            error={error !== ""}
            helperText={error}
          />
          <Button
            style={buttonStyle}
            variant="contained"
            fullWidth
            onClick={handlePasswordReset}
            disabled={isButtonDisabled}
          >
            Set New Password
          </Button>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
