import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Chip } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DiscountIcon from "@mui/icons-material/Discount";
export default function ActionAreaCard({ details }) {
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

  return (
    <Card
      sx={{
        borderRadius: "10px",
        width: 350,
        height: 320,
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
      </CardActionArea>
    </Card>
  );
}
