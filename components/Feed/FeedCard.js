import React, { useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import { DELETE } from "@/services/httpClient";
import { AppContext } from "@/context/appContext";

export default function ActionAreaCard({
  description,
  isUpdated,
  setIsUpdated,
  imageUrl,
  id,
}) {
  const { isLoading, setIsLoading, setSnackbarState } = useContext(AppContext);
  const router = useRouter();
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [isExpanded, setIsExpanded] = useState(false);

  async function deleteFeed() {
    try {
      setIsLoading(true);
      const response = await DELETE(
        `/feed?userId=${userData.userId}&feedId=${id}`
      );
      setIsLoading(false);
      setSnackbarState({
        severity: "success",
        open: true,
        message: "Feed deleted successfully",
      });
      setIsUpdated(!isUpdated);
    } catch (error) {
      setIsLoading(true);
      setSnackbarState({
        severity: "error",
        open: true,
        message: "Failed to create store",
      });
      setIsLoading(false);
    }
  }

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card
      sx={{
        mt: "20px",
        borderRadius: "10px",
        width: 350,
        height: "auto",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 4px 20px rgba(0, 123, 255, 0.3)",
        },
        backgroundImage: "linear-gradient(to right, #b716d8, #d126b0)",
      }}
      onClick={handleCardClick}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="150"
          image={`${process.env.NEXT_PUBLIC_BASE_URL}${imageUrl?.replace(
            "public",
            ""
          )}`}
          alt="green iguana"
        />
        <CardContent sx={{ padding: "5px" }}>
          <Typography
            variant="body1"
            component="div"
            sx={{
              overflow: isExpanded ? "visible" : "hidden",
              whiteSpace: isExpanded ? "normal" : "nowrap",
              textOverflow: isExpanded ? "auto" : "ellipsis",
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box display={"flex"} justifyContent={"center"}>
        <IconButton onClick={deleteFeed}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
}
