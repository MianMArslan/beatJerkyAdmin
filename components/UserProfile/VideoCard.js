import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Chip, Grid } from "@mui/material";
import { GET } from "@/services/httpClient";

export default function ArtistProfileCard({ data }) {
  return (
    <>
      {data && data?.length ? (
        <Grid container spacing={2}>
          {data?.map((item, index) => (
            <Grid item key={index} md={3} sm={6} xs={12}>
              <Card
                sx={{
                  width: 250,
                  height: 220,
                  margin: "10px",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  backgroundColor: "#b716d8", // Set the default card color

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
                    justifyContent: "space-between",
                    minHeight: 200,
                  }}
                >
                  {item.videoUrl && (
                    <video
                      controls
                      width="220px"
                      height="110px"
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                      src={`${
                        process.env.NEXT_PUBLIC_BASE_URL
                      }${item.videoUrl?.replace("public", "")}`}
                    />
                  )}
                  <Chip
                    sx={{ backgroundColor: "rgba(63, 1, 74, 0.5)" }}
                    label={item.description || "N/A"}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="h5">No Record Found</Typography>
        </Box>
      )}
    </>
  );
}
