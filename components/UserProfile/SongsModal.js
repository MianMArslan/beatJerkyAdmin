import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box, Chip, Grid, IconButton, Modal } from "@mui/material";
import { GET } from "@/services/httpClient";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SongCard from "./SongCard";
const SongModal = ({ isOpen, onClose, artistProfileId }) => {
  const [isPlayingArray, setIsPlayingArray] = useState([]);
  const [songsData, setSongsData] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);

  async function fetchAllSongs() {
    const songsResponse = await GET(
      `/artist-songs/byArtistId/?artistId=${artistProfileId}`
    );
    setSongsData(songsResponse.data);
    setIsPlayingArray(new Array(songsResponse.data.length).fill(false));
  }
  async function fetchCategories() {
    try {
      const responseOfCategory = await GET("/musicStyle");
      setCategoriesList(responseOfCategory.data);
      console.log(
        "🚀🚀🚀🚀🚀🚀🚀🚀 ~ file: SongsModal.js:16 ~ fetchAllSongs ~ songsResponse:",
        responseOfCategory
      );
    } catch (error) {}
  }
  useEffect(() => {
    if (artistProfileId) fetchAllSongs();

    fetchCategories();
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
          pt: 2,
          bgcolor: "#2e2e2e",
          width: "40%",
          height: "60%",
          overflowY: "auto",

          minWidth: "250px",
        }}
      >
        <div style={{ width: "80%", height: "80%", margin: "auto" }}>
          <Grid container spacing={5}>
            {songsData?.length ? (
              songsData?.map((song, index) => (
                <Grid
                  item
                  key={index}
                  md={12}
                  sm={12}
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <SongCard
                    categoriesList={categoriesList}
                    song={song}
                    handlePlayPause={handlePlayPause}
                    index={index}
                    isPlayingArray={isPlayingArray}
                  />
                </Grid>
              ))
            ) : (
              <Box mt={10}>
                <Typography variant="h6">No Record Found</Typography>
              </Box>
            )}
          </Grid>
        </div>
      </Card>
    </Modal>
  );
};

export default SongModal;
