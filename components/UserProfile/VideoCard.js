import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Chip, Grid } from "@mui/material";
import { GET } from "@/services/httpClient";

export default function ArtistProfileCard({}) {
  const [data, setData] = useState([]);
  async function fetchVideoRecords() {
    const response = await GET(`/video?userId=${userId}`);
  }
  console.log(
    "🚀 ~ file: VideoCard.js:12 ~ fetchVideoRecords ~ response:",
    response
  );
  setData(response.data);

  useEffect(() => {
    fetchVideoRecords();
  }, []);

  return (
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
                justifyContent: "center",
                minHeight: 200,
              }}
            >
              {item.videoUrl && (
                <video
                  controls
                  width="100%"
                  height="100%"
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                  src={`${
                    process.env.NEXT_PUBLIC_BASE_URL
                  }${item.videoUrl?.replace("public", "")}`}
                />
              )}
              <Chip label={item.description || "N/A"} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
