import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { Container, Tabs, Tab, Box, Avatar, Typography } from "@mui/material";
import { GET } from "@/services/httpClient";
import { useRouter } from "next/router";
import Feed from "./Feed";
import ArtistProfileCard from "./ArtistProfileCard";
import EventCard from "./EventCard";
import SongModal from "./SongsModal";
import VideoCard from "./VideoCard";
import { AppContext } from "@/context/appContext";
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const MyPage = () => {
  const { isLoading, setIsLoading, setSnackbarState } = useContext(AppContext);

  const [tabValue, setTabValue] = useState(0);
  const [artistProfiles, setArtistPRofiles] = useState(null);
  const [events, setEvents] = useState(null);
  const [feed, setFeeds] = useState(null);
  const [videos, setVideos] = useState(null);

  const [openSongModal, setOpenSongModal] = useState(false);
  const [artistProfileId, setArtistProfileId] = useState(null);

  const [followFollowingData, setFollowFollowingData] = useState(null);

  const [selectedUserProfile, setSelectedUserProfile] = useState(null);

  const router = useRouter();
  const userId = router.query.userId;

  function onClose() {
    setOpenSongModal(false);
    setArtistProfileId(null);
  }

  async function fetchAllData() {
    setIsLoading(true);
    try {
      const userResponse = await GET(`/users/current/?userId=${userId}`);

      console.log(
        "🚀 ~ file: index.js:56 ~ fetchAllData ~ userResponse:",
        userResponse
      );
      const videoResponse = await GET(`/video/?userId=${userId}`);
      const feedResponse = await GET(`/feed?userId=${userId}`);
      const artistProfilesResponse = await GET(
        `/artist-profile/byUserId?userId=${userId}`
      );

      const EventsResponse = await GET(
        `/artist-events/event/byClientId?clientId=${userId}`
      );
      const a = await GET("/follower", { params: { userId } });
      setSelectedUserProfile(userResponse.data[0]);
      setFollowFollowingData(a.data);
      setEvents(EventsResponse.data);
      setArtistPRofiles(artistProfilesResponse.data);
      setFeeds(feedResponse.data);
      setVideos(videoResponse.data);
    } catch (error) {
      setSnackbarState({
        severity: "error",
        open: true,
        message: `Failed to Fetch User Data! ${error}`,
      });
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (userId) fetchAllData();
  }, [userId]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container>
      <SongModal
        artistProfileId={artistProfileId}
        onClose={onClose}
        isOpen={openSongModal}
      />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mt={2}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar
            alt={selectedUserProfile?.firstName || "N/A"}
            src={`${
              process.env.NEXT_PUBLIC_BASE_URL
            }${selectedUserProfile?.profileImg?.replace("public", "")}`}
          />
          <Typography>
            {selectedUserProfile?.firstName +
              " " +
              selectedUserProfile?.lastName}
          </Typography>
        </Box>
        <Box>
          {" "}
          <Tabs
            indicatorColor="secondary"
            value={tabValue}
            onChange={handleChange}
            centered
          >
            <Tab
              label="User Feed"
              style={{ color: tabValue === 0 ? "#e034fa" : "white" }}
            />
            <Tab
              label="Artist Profile"
              style={{ color: tabValue === 1 ? "#e034fa" : "white" }}
            />
            <Tab
              label="Videos"
              style={{ color: tabValue === 2 ? "#e034fa" : "white" }}
            />
            <Tab
              label="Events"
              style={{ color: tabValue === 3 ? "#e034fa" : "white" }}
            />
          </Tabs>
        </Box>
        <Typography>
          Followers:{" " + followFollowingData?.follower} {""} | Following:
          {" " + followFollowingData?.following}
        </Typography>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Feed data={feed} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <ArtistProfileCard
          data={artistProfiles}
          setArtistProfileId={setArtistProfileId}
          setOpenSongModal={setOpenSongModal}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <VideoCard data={videos} />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <EventCard data={events} />
      </TabPanel>
    </Container>
  );
};

export default MyPage;
