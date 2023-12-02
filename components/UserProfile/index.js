import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Container, Tabs, Tab, Box } from "@mui/material";
import { GET } from "@/services/httpClient";
import { useRouter } from "next/router";
import Feed from "./Feed";
import ArtistProfileCard from "./ArtistProfileCard";
import EventCard from "./EventCard";
import SongModal from "./SongsModal";
import VideoCard from "./VideoCard";
import axios from "axios";
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
  const [tabValue, setTabValue] = useState(0);
  const [artistProfiles, setArtistPRofiles] = useState(null);
  const [events, setEvents] = useState(null);
  const [feed, setFeeds] = useState(null);
  const [videos, setVideos] = useState(null);

  const [openSongModal, setOpenSongModal] = useState(false);
  const [artistProfileId, setArtistProfileId] = useState(null);

  const router = useRouter();
  const userId = router.query.userId;

  function onClose() {
    setOpenSongModal(false);
    setArtistProfileId(null);
  }

  async function fetchAllData() {
    let videosResponse;
    try {
      // Make a GET request
      videosResponse = await axios.get(
        `http://beatjerky.com/api/video?userId=${userId}`
      );
      console.log(
        "🚀 ~ file: index.js:52 ~ fetchAllData ~ videosResponse:",
        videosResponse
      );

      // Access the data from the response
    } catch (error) {
      // Handle errors
      console.error("Error fetching data:", error);
    }
    try {
      // const videosResponse = await GET(`/video?userId=${userId}`);

      const feedResponse = await GET(`/feed?userId=${userId}`);
      const artistProfilesResponse = await GET(
        `/artist-profile/byUserId?userId=${userId}`
      );

      const EventsResponse = await GET(
        `/artist-events/event/byClientId?clientId=${userId}`
      );
      setEvents(EventsResponse.data);
      setArtistPRofiles(artistProfilesResponse.data);
      setFeeds(feedResponse.data);
      setVideos(videosResponse.data.data);
      console.log(
        "🚀🚀🚀PASS🚀🚀🚀PASS ~ file: index.js:31 ~ fetchAllData ~ artistProfilesResponse:",
        artistProfilesResponse,
        EventsResponse,
        feedResponse,
        videosResponse
      );
    } catch (error) {
      console.log("🚀 ~ file: index.js:31 ~ fetchAllData ~ error:", error);
    }
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
      <TabPanel value={tabValue} index={0}>
        {/* Content for User Feed Tab */}
        <p>User Feed Content</p>
        <Feed data={feed} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        {/* Content for Artist Profile Tab */}
        <p>Artist Profile Content</p>
        <ArtistProfileCard
          data={artistProfiles}
          setArtistProfileId={setArtistProfileId}
          setOpenSongModal={setOpenSongModal}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        {/* Content for Songs Tab */}
        <p>Videos Content</p>
        <VideoCard data={videos} />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        {/* Content for Events Tab */}
        <p>Events Content</p>
        <EventCard data={events} />
      </TabPanel>
    </Container>
  );
};

export default MyPage;
