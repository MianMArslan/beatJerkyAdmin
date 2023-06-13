import React, { useContext, useState } from "react";
import { Snackbar, Paper } from "@mui/material";
import { AppContext } from "../context/appContext";

const GlobalSnackbar = () => {
  const { snackbarState, setSnackbarState } = useContext(AppContext);

  const handleClose = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  const getSnackbarStyle = () => {
    let backgroundColor = "";

    if (snackbarState.severity === "error") {
      backgroundColor = "#f44336"; // Red color for error severity
    } else if (snackbarState.severity === "success") {
      backgroundColor = "#4caf50"; // Green color for success severity
    }

    return {
      backgroundColor: backgroundColor,
    };
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={snackbarState.open}
      onClose={handleClose}
      autoHideDuration={3000}
      ContentProps={{
        component: Paper,
        style: getSnackbarStyle(),
      }}
      message={snackbarState.message}
    />
  );
};
export default GlobalSnackbar;
