import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, Chip, IconButton } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DiscountIcon from "@mui/icons-material/Discount";
import EditProductModal from "./EditProductModal";
import { DELETE, UPDATE } from "@/services/httpClient";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
export default function ActionAreaCard({ details, isUpdated, setIsUpdated }) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Time interval in milliseconds
  };

  const productImages = [];

  for (let i = 1; i <= 4; i++) {
    const imgKey = `productImg${i}`;
    if (details[imgKey]) {
      productImages.push(details[imgKey]);
    }
  }

  // Modify the image URLs here
  const modifiedProductImages = productImages.map(
    (image) =>
      `${process.env.NEXT_PUBLIC_BASE_URL}${image?.replace("public", "")}`
  );
  const handleEditProduct = async (updatedProductData) => {
    // Handle updating the product data in your application state or API
    console.log("Updated product data:", updatedProductData);
    try {
      const response = await UPDATE(`/products`, {
        productName: updatedProductData.productName,
        productDescription: updatedProductData.productDescription,
        productPrice: updatedProductData.productPrice,
        productDiscount: updatedProductData.discountPercentage,
        productId: updatedProductData.productId,
        storeId: updatedProductData.storeId,
      });
      setIsUpdated(!isUpdated);
    } catch (error) {
      console.log(
        "🚀 ~ file: ProductCard.js:54 ~ handleEditProduct ~ error:",
        error
      );
    }
  };

  async function handleDelete(id) {
    try {
      const response = await DELETE(`/products/${id}`);
      setIsUpdated(!isUpdated);
    } catch (error) {
      console.log(
        "🚀 ~ file: ProductCard.js:67 ~ handleDelete ~ error:",
        error
      );
    }
  }

  return (
    <Card
      sx={{
        marginTop: "30px",
        borderRadius: "10px",
        maxWidth: "20rem", // Make the card responsive
        height: "auto", // Make the card responsive
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 4px 20px rgba(0, 123, 255, 0.3)",
        },
        backgroundImage: "linear-gradient(to right, #b716d8, #d126b0)",
      }}
    >
      <CardActionArea>
        <Box>
          {modifiedProductImages.length > 0 && (
            <Slider {...settings}>
              {modifiedProductImages.map((image, index) => (
                <CardMedia
                  key={index}
                  component="img"
                  height="150"
                  image={image}
                  alt={`Product Image ${index}`}
                />
              ))}
            </Slider>
          )}
        </Box>

        <Box mt={4} ml={2}>
          <Box>
            <Chip
              icon={<ShoppingCartIcon />}
              label={details.productName}
              variant="outlined"
            />
          </Box>
          <Box mt={1}>
            <Chip
              icon={<DescriptionIcon />}
              label={details.productDescription}
              variant="outlined"
            />
          </Box>
          <Box mt={1}>
            <Chip
              icon={<AttachMoneyIcon />}
              label={details.productPrice}
              variant="outlined"
            />
            <Chip
              style={{ marginLeft: "10px" }}
              icon={<DiscountIcon />}
              label={details.productDiscount + "%"}
              variant="outlined"
            />
          </Box>
        </Box>

        <Box mt={1} display={"flex"} justifyContent={"center"}>
          {/* Edit button */}
          <IconButton onClick={() => setEditModalOpen(true)}>
            <EditIcon />
          </IconButton>

          <IconButton onClick={() => handleDelete(details.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardActionArea>
      <EditProductModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        initialProductData={{
          productId: details.id,
          storeId: details.storeId,
          productName: details.productName,
          productDescription: details.productDescription,
          productPrice: details.productPrice,
          discountPercentage: details.productDiscount,
        }}
        onSave={handleEditProduct}
      />
    </Card>
  );
}
