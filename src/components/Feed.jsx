import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import Sidebar from "./Sidebar";
import Videos from "./Videos";
import { useEffect, useState, useCallback } from "react";
import { ApiFetch } from "../assets/ApiFetch";
import Navbar from "./Navbar";
import "../index.css";

export default function Feed() {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [open, setOpen] = useState(true);

  const fetchVideos = useCallback(
    async (pageToken = "") => {
      setLoading(true);
      try {
        const params = `search?part=snippet&q=${selectedCategory}&pageToken=${pageToken}`;
        const data = await ApiFetch(params);
        setVideos((prevVideos) => [...prevVideos, ...data.items]);
        setNextPageToken(data.nextPageToken);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    },
    [selectedCategory]
  );

  useEffect(() => {
    setVideos([]);
    fetchVideos();
  }, [selectedCategory, fetchVideos]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !loading
      ) {
        fetchVideos(nextPageToken);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [nextPageToken, loading, fetchVideos]);

  return (
    <>
      <Navbar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        showDrawer={true}
        open={open}
        setOpen={setOpen}
      />

      <Grid container>
        <Grid item xs={12} md={6} className="phonebox1">
          <Box
            className="seperator"
            sx={{
              mt: 6,
              bgcolor: "white",
              display: { xs: "block", md: "none", lg: "none" },
              height: { sx: "200px", md: "92vh" },
              px: { sx: 0, md: 2 },
            }}
          >
            <Sidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            p={2}
            sx={{
              overflowY: "auto",
              height: "100vh",
              flex: 2,
              bgcolor: "white",
              marginLeft: "60px",
            }}
            className="videobox"
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              mt={7}
              mb={2}
              sx={{ color: "black", ml: { md: 1 } }}
            >
              {selectedCategory}{" "}
              <span style={{ color: "#FC1503" }}>videos</span>
            </Typography>
            <Videos videos={videos} direction="row" loading={loading} />
            {initialLoading && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
              >
                <CircularProgress />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
