import React, { useContext, useState } from "react";
import {
  Modal,
  Button,
  TextField,
  Paper,
  Grid,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { UPLOAD_FORM_DATA } from "@/services/httpClient";
import { useRouter } from "next/router";
import { AppContext } from "@/context/appContext";

const ProductModal = ({ isUpdated, setIsUpdated }) => {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState(Array(4).fill(null));
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const router = useRouter();
  const { setIsLoading, setSnackbarState } = useContext(AppContext);
  const addProduct = async (productData, imageFiles) => {
    try {
      const formData = new FormData();

      // Append product data to the formData
      formData.append("productName", productData.productName);
      formData.append("productDescription", productData.productDescription);
      formData.append("productPrice", productData.productPrice);
      formData.append("productDiscount", productData.discountPercentage);
      formData.append("storeId", router.query.storeId);
      // Append image files to the formData
      imageFiles.forEach((file, index) => {
        formData.append("files", file);
      });

      const response = await UPLOAD_FORM_DATA("/products", formData);
      console.log(
        "🚀 ~ file: ProductModal.js:42 ~ addProduct ~ response:",
        response
      );

      if (!response) {
        throw new Error("Failed to add product");
      }
      setOpen(false);
      setIsUpdated(!isUpdated);
      setIsLoading(false);
    } catch (error) {
      console.error("Error adding product:", error);

      setOpen(false);
      setIsLoading(false);
      throw error;
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    const productData = {
      productName,
      productDescription,
      productPrice,
      discountPercentage,
    };

    try {
      const response = await addProduct(productData, files);
      console.log("Product added:", response);
      setSnackbarState({
        severity: "success",
        open: true,
        message: "Product added successfully",
      });
      handleClose();
    } catch (error) {
      console.error("Error adding product:", error);
      setSnackbarState({
        severity: "error",
        open: true,
        message: "Error adding product",
      });
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const newFiles = [...files];
      newFiles[files.findIndex((file) => file === null)] = acceptedFiles[0];
      setFiles(newFiles);
    },
  });

  const isSaveButtonDisabled =
    !productName ||
    !productDescription ||
    !productPrice ||
    !discountPercentage ||
    files.some((file) => file === null);

  const buttonStyle = {
    backgroundImage: "linear-gradient(to right, #b716d8, #d126b0)",
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div>
      <Box display={"flex"} justifyContent={"flex-end"}>
        <Button style={buttonStyle} onClick={handleOpen}>
          Add Product
        </Button>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: 800,
            bgcolor: "#1e1f21",
            color: "white",
            p: 3,
            outline: "none",
            borderRadius: "10px",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  borderRadius: "10px",
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                  height: "100%",
                }}
              >
                <Box
                  {...getRootProps()}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "16px",
                    marginBottom: "16px",
                  }}
                >
                  {files.map((file, index) => (
                    <Box
                      key={index}
                      sx={{
                        border: "2px dashed white",
                        borderRadius: "10px",
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      <input {...getInputProps()} />
                      {file ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index}`}
                          style={{ maxWidth: "100%", maxHeight: 100 }}
                        />
                      ) : (
                        <Typography variant="body1">
                          Drag & Drop Image {index + 1}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Product Name"
                variant="outlined"
                fullWidth
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                sx={{ mb: 2, background: "transparent" }}
              />

              <TextField
                label="Product Description"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                sx={{ mb: 2, background: "transparent" }}
              />
              <Box display={"flex"}>
                <TextField
                  label="Price"
                  variant="outlined"
                  fullWidth
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  sx={{ mb: 2, background: "transparent" }}
                />
                <TextField
                  label="Discount Percentage"
                  variant="outlined"
                  fullWidth
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(e.target.value)}
                  sx={{ mb: 2, background: "transparent" }}
                />
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ margin: "16px 0", background: "white" }} />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSave}
            disabled={isSaveButtonDisabled}
            style={buttonStyle}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ProductModal;
