import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PauseIcon from "@mui/icons-material/Pause";
import { Chip, Tooltip } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { GET } from "@/services/httpClient";

export default function MediaControlCard({
  song,
  handlePlayPause,
  index,
  isPlayingArray,
  categoriesList,
}) {
  const [category, setCategory] = useState();
  const theme = useTheme();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const responseOfCategory = await GET(
          `/musicStyle/byId/?id=${song.songCategoryId}`
        );
        setCategory(
          responseOfCategory?.data?.musicStyleName
            ? responseOfCategory?.data?.musicStyleName
            : "N/A"
        );
        console.log(
          "🚀🚀🚀🚀🚀🚀🚀🚀 ~ file: SongsModal.js:16 ~ fetchAllSongs ~ songsResponse:",
          responseOfCategory
        );
      } catch (error) {
        console.log(
          "🚀 ~ file: SongCard.js:39 ~ fetchCategories ~ error:",
          error
        );
      }
    }
    fetchCategories();
  }, []);

  return (
    <Card
      sx={{
        display: "flex",
        backgroundImage: "linear-gradient(to left, #b716d8, #d126b0) ",
        height: "180px",
        width: "400px",
        mb: "20px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto", pb: 0 }}>
          <Box display="flex" flexDirection="column" gap={1}>
            <Tooltip title={song?.songName}>
              <Chip
                sx={{ backgroundColor: "rgba(63, 1, 74, 0.5)" }}
                label={"Song Name:" + song?.songName}
              />
            </Tooltip>
            <Tooltip title={song?.artistName}>
              <Chip
                sx={{ backgroundColor: "rgba(63, 1, 74, 0.5)" }}
                label={"Artist Name:" + song?.artistName}
              />
            </Tooltip>
            <Tooltip title={song?.bandName}>
              <Chip
                sx={{ backgroundColor: "rgba(63, 1, 74, 0.5)" }}
                label={"Band Name:" + song?.bandName}
              />
            </Tooltip>{" "}
            <Tooltip title={song?.bandName}>
              <Chip
                sx={{ backgroundColor: "rgba(63, 1, 74, 0.5)" }}
                label={"Category:" + category}
              />
            </Tooltip>
          </Box>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pl: 1,
            pb: 1,
          }}
        >
          <IconButton
            variant="contained"
            onClick={() => handlePlayPause(index)}
          >
            {isPlayingArray[index] ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          {isPlayingArray[index] && (
            <audio
              style={{ display: "none" }}
              autoPlay={isPlayingArray[index]}
              controls
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${song.songPath?.replace(
                "public",
                ""
              )}`}
            />
          )}
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 230 }}
        image={`${process.env.NEXT_PUBLIC_BASE_URL}${song.picturePath?.replace(
          "public",
          ""
        )}`}
        alt="Live from space album cover"
      />
    </Card>
  );
}
