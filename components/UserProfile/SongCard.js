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

export default function MediaControlCard({
  song,
  handlePlayPause,
  index,
  isPlayingArray,
}) {
  const theme = useTheme();

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
              <Chip label={"Song Name:" + song?.songName} />
            </Tooltip>
            <Tooltip title={song?.artistName}>
              <Chip label={"Artist Name:" + song?.artistName} />
            </Tooltip>
            <Tooltip title={song?.bandName}>
              <Chip label={"Band Name:" + song?.bandName} />
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
