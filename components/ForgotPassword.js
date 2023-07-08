import { Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { UPDATE ,POST_WITHOUT_TOKEN} from "../services/httpClient";
import { AppContext } from "../context/appContext";
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";

function ForgotPassword() {
  const { setIsLoading, setSnackbarState } = useContext(AppContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  
  const buttonStyle = {
    backgroundImage: "linear-gradient(to right, #b716d8, #d126b0)",
    color: "white",
    fontWeight: "bold",
    marginTop: "20px",
  };
  
  const handleEmailSend = async () => {
    setIsLoading(true);
    
    if (email === "") {
      setError("Email field cannot be empty");
      setIsLoading(false);
      return;
    }
    
    const params = { email };
    
    try {
      const response = await POST_WITHOUT_TOKEN("/auth/forgotPassword", params);
       
      if (response.error) {
        setSnackbarState({
          severity: "error",
          open: true,
          message: "An error occurred while sending the password reset email",
        });
      } else if (response.status === "success") {
        setSnackbarState({
          severity: "success",
          open: true,
          message: "Password reset email sent successfully",
        });
        
       }
    } catch (error) {
      console.error(error);
      setSnackbarState({
        severity: "error",
        open: true,
        message: "An error occurred while sending the password reset email",
      });
    }
    
    setIsLoading(false);
  };
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };
  
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "10vh" }}>
        <div style={{ width: "400px", display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center" }}>
          <Typography variant="h4">Forgot Your Password?</Typography>
          <TextField
            style={{ marginTop: "60px" }}
            id="email"
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={handleEmailChange}
            error={error !== ""}
            helperText={error}
          />
          <Button
            style={buttonStyle}
            variant="contained"
            fullWidth
            onClick={handleEmailSend}
          >
            Send Email
          </Button>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
