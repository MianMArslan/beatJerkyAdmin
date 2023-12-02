import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Chip, Grid, IconButton, Modal } from "@mui/material";
import { GET } from "@/services/httpClient";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
const SongModal = ({ isOpen, onClose, artistProfileId }) => {
  const [isPlayingArray, setIsPlayingArray] = useState([]);
  const [songsData, setSongsData] = useState([]);

  async function fetchAllSongs() {
    const songsResponse = await GET(
      `/artist-songs/byArtistId/?artistId=${artistProfileId}`
    );
    setSongsData(songsResponse.data);
    setIsPlayingArray(new Array(songsResponse.data.length).fill(false));
    console.log(
      "🚀🚀🚀🚀🚀🚀🚀🚀 ~ file: SongsModal.js:16 ~ fetchAllSongs ~ songsResponse:",
      songsResponse
    );
  }

  useEffect(() => {
    if (artistProfileId) fetchAllSongs();

    return;
  }, [artistProfileId]);

  const handlePlayPause = (index) => {
    // Toggle play/pause logic for the selected song
    setIsPlayingArray((prev) => {
      const newArray = [...prev];
      newArray[index] = !newArray[index];
      return newArray;
    });
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Card
        sx={{
          bgcolor: "#2e2e2e",
          maxWidth: "800px",
          height: "500px",
          overflowY: "auto",
          borderRadius: "18px",
          minWidth: "250px",
        }}
      >
        <div style={{ width: "80%", height: "80%", margin: "auto" }}>
          <Grid container spacing={5}>
            {songsData?.map((song, index) => (
              <Grid item key={index} md={4} sm={6} xs={12}>
                <Card
                  sx={{
                    width: 200,
                    height: 200,
                    margin: "10px",
                    backgroundColor: "#b716d8",
                    transition: "transform 0.3s, box-shadow 0.3s",
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
                      backgroundImage: `url(${
                        process.env.NEXT_PUBLIC_BASE_URL
                      }${song.picturePath?.replace("public", "")})`, // Background image
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <Typography variant="body2" component="p">
                      {song.description || "No description available"}
                    </Typography>
                    <Chip label={song.songName || "N/A"} />
                    <IconButton
                      variant="contained"
                      onClick={() => handlePlayPause(index)}
                    >
                      {isPlayingArray[index] ? (
                        <PauseIcon />
                      ) : (
                        <PlayArrowIcon />
                      )}
                    </IconButton>
                    {isPlayingArray[index] && (
                      <audio
                        style={{ display: "none" }}
                        autoPlay={isPlayingArray[index]}
                        controls
                        src={`${
                          process.env.NEXT_PUBLIC_BASE_URL
                        }${song.songPath?.replace("public", "")}`} // Replace with the actual audio URL
                      />
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </Card>
    </Modal>
  );
};

export default SongModal;
