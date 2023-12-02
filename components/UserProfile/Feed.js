import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Chip, Grid } from "@mui/material";

export default function ArtistProfileCard({ data }) {
  return (
    <Grid container spacing={2}>
      {data?.map((item, index) => (
        <Grid item key={index} md={3} sm={6} xs={12}>
          <Card
            sx={{
              maxWidth: 250,
              margin: "10px",
              transition: "transform 0.3s, box-shadow 0.3s",
              backgroundColor: "#b716d8",
              backgroundImage: `url(${
                process.env.NEXT_PUBLIC_BASE_URL
              }${item.imageUrl.replace("public", "")})`,
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 4px 20px rgba(0, 123, 255, 0.3)",
              },
            }}
          >
            <CardContent
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 200,
              }}
            >
              <Typography variant="body2" component="p">
                {item.description || "No description available"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
