import { Box, CircularProgress } from "@mui/material";
import Videos from "./Videos";
import { useEffect, useState } from "react";
import { ApiFetch } from "../assets/ApiFetch";
import { useParams } from "react-router-dom";
export default function SearchFeed() {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setVideos([]);
    ApiFetch(`search?part=snippet&q=${searchTerm}`)
      .then((data) => {
        setVideos(data.items);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setLoading(false);
      });
  }, [searchTerm]);
  return (
    <Box
      p={2}
      sx={{
        overflowY: "auto",
        height: "100vh",
        flex: 2,
        bgcolor: "white",
        marginTop: "60px",
      }}
      className="videobox"
    >
      {/* <Typography
        variant="h4"
        fontWeight="bold"
        mt={7}
        mb={2}
        sx={{ color: "black", ml: { md: 1 } }}
      >
        Search Result for :
        <span style={{ color: "#FC1503" }}>{searchTerm}</span>Videos
      </Typography> */}
      {loading ? ( // Display loading indicator if loading is true
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Videos videos={videos} />
      )}
    </Box>
  );
}
