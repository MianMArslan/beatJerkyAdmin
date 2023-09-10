import React, { useState } from "react";
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
import { useEffect } from "react";

const EditProductModal = ({ open, onClose, initialProductData, onSave }) => {
  const [productData, setProductData] = useState(initialProductData);

  const handleSave = () => {
    onSave(productData);
    onClose();
  };
  useEffect(() => {
    setProductData({
      ...productData,
      productId: initialProductData.productId,
      storeId: initialProductData.storeId,
    });
  }, [initialProductData]);
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          padding: "20px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "40%",
          maxWidth: 800,
          bgcolor: "#1e1f21",
          color: "white",
          p: 3,
          outline: "none",
          borderRadius: "10px",
        }}
      >
        {/* Similar layout as the ProductModal */}
        {/* ... */}
        <Box sx={{ textAlign: "center" }}>
          <TextField
            style={{ marginTop: "20px" }}
            size="small"
            label="Product Name"
            variant="outlined"
            fullWidth
            value={productData.productName}
            onChange={(e) =>
              setProductData({
                ...productData,
                productName: e.target.value,
              })
            }
            sx={{ mb: 2, background: "transparent" }}
          />
          <TextField
            size="small"
            label="Product Description"
            variant="outlined"
            fullWidth
            value={productData.productDescription}
            onChange={(e) =>
              setProductData({
                ...productData,
                productDescription: e.target.value,
              })
            }
            sx={{ mb: 2, background: "transparent" }}
          />
          <TextField
            size="small"
            label="Product Product Price"
            variant="outlined"
            fullWidth
            value={productData.productPrice}
            onChange={(e) =>
              setProductData({
                ...productData,
                productPrice: e.target.value,
              })
            }
            sx={{ mb: 2, background: "transparent" }}
          />
          <TextField
            size="small"
            label="Product Discount"
            variant="outlined"
            fullWidth
            value={productData.discountPercentage}
            onChange={(e) =>
              setProductData({
                ...productData,
                discountPercentage: e.target.value,
              })
            }
            sx={{ mb: 2, background: "transparent" }}
          />
        </Box>
        {/* ... Other fields ... */}

        <Divider sx={{ margin: "16px 0", background: "white" }} />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSave}
          // Disable the button if any required field is empty
          disabled={
            !productData.productName ||
            !productData.productDescription ||
            !productData.productPrice ||
            !productData.discountPercentage
          }
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default EditProductModal;
