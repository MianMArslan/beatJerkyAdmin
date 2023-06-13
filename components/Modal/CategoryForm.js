import React, { useState } from "react";
import { Grid, TextField, Button, Typography, Alert } from "@mui/material";
import { POST } from "../../services/httpClient";

const CategoryForm = () => {
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
    categoryDescription: "",
  });
  const [buttonStatus, setButtonStatus] = useState(false);
  const buttonStyle = {
    marginTop: "10px",
    backgroundImage: "linear-gradient(to right, #b716d8, #d126b0)",
    color: "white",
    fontWeight: "bold",
  };

  const handleSubmit = async () => {
    try {
      const response = await POST("/category/createCategory", categoryData);
      setButtonStatus(true);
      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    setCategoryData({
      ...categoryData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6">Add Songs Category</Typography>
      </div>
      <Grid container mt={2} spacing={2}>
        <Grid sm={12} item>
          <TextField
            fullWidth
            size="small"
            label="Category Name"
            name="categoryName"
            value={categoryData.categoryName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid sm={12} item>
          <TextField
            fullWidth
            size="small"
            label="Category Description"
            name="categoryDescription"
            value={categoryData.categoryDescription}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid sm={6} item></Grid>
      </Grid>
      {buttonStatus ? (
        <Alert variant="filled" severity="success">
          Category Added Successfully
        </Alert>
      ) : (
        <Button
          style={buttonStyle}
          onClick={handleSubmit}
          fullWidth
          variant="contained"
        >
          Done
        </Button>
      )}
    </>
  );
};

export default CategoryForm;
