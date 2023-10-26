import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Box, Typography, Backdrop, CircularProgress } from "@mui/material";

const DeleteAccountForm = () => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    reason: "",
    loading: false,
  });

  const isFormValid =
    formValues.firstName &&
    formValues.lastName &&
    formValues.email &&
    formValues.reason;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the form is valid before submitting
    if (isFormValid) {
      // Show loading state
      setFormValues({ ...formValues, loading: true });
      // Simulate a 3-second delay (you can replace this with your actual API request)
      setTimeout(() => {
        // After the delay, open the success modal
        setFormValues({ ...formValues, loading: false });
        handleOpen();
      }, 3000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: "10vh" }}>
      <Box display="flex" justifyContent="center" mb={5}>
        <Typography variant="h5">Delete Account</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              required
              name="firstName"
              value={formValues.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              required
              name="lastName"
              value={formValues.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              required
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Reason for Account Deletion"
              required
              name="reason"
              multiline
              rows={4}
              value={formValues.reason}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="error"
              fullWidth
              disabled={!isFormValid || formValues.loading}
            >
              {formValues.loading ? "Processing..." : "Delete Account"}
            </Button>
          </Grid>
        </Grid>
      </form>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          {" "}
          <Typography variant="h6" color="black">
            Account Deletion Request
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography color="black">
              Your request for account deletion has been submitted successfully.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Backdrop with circular loading indicator */}
      <Backdrop
        open={formValues.loading}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: "#fff" }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default DeleteAccountForm;
