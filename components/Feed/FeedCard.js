import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import { DELETE } from "@/services/httpClient";
export default function ActionAreaCard({
  description,
  isUpdated,
  setIsUpdated,
  imageUrl,
  id,
}) {
  const router = useRouter();
  const userData = JSON.parse(localStorage.getItem("userData"));
  async function deleteFeed() {
    try {
      const response = await DELETE(
        `/feed?userId=${userData.userId}&feedId=${id}`
      );
      setIsUpdated(!isUpdated);
    } catch (error) {}
  }
  return (
    <Card
      sx={{
        mt: "20px",
        borderRadius: "10px",
        width: 350,
        height: 250,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 4px 20px rgba(0, 123, 255, 0.3)",
        },
        backgroundImage: "linear-gradient(to right, #b716d8, #d126b0)",
      }}
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
          <Typography gutterBottom variant="h6">
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
