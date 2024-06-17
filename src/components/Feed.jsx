import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import Sidebar from "./Sidebar";
import Videos from "./Videos";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos, resetVideos } from "../slices/videoSlice";
import Navbar from "./Navbar";
import "../index.css";

export default function Feed() {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.category);
  const {
    items: videos,
    nextPageToken,
    loading,
    initialLoading,
  } = useSelector((state) => state.videos);

  useEffect(() => {
    dispatch(resetVideos());
    dispatch(fetchVideos({ selectedCategory, pageToken: "" }));
  }, [selectedCategory, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !loading
      ) {
        dispatch(fetchVideos({ selectedCategory, pageToken: nextPageToken }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [nextPageToken, loading, dispatch, selectedCategory]);

  return (
    <>
      <Navbar showDrawer={true} />

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
            <Sidebar selectedCategory={selectedCategory} />
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
