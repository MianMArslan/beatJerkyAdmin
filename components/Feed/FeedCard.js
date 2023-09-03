import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useRouter } from "next/router";

export default function ActionAreaCard({
  description,

  imageUrl,
  id,
}) {
  const router = useRouter();

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
    </Card>
  );
}
