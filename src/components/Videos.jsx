import React from "react";
import { useSelector } from "react-redux";
import { Stack, Box, Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import VideoCard from "./VideoCard";

const Videos = ({ videos, drawerOpen, direction, loading }) => {
  const isDarkMode = useSelector((state) => state.darkMode.value);

  const boxStyle = {
    backgroundColor: isDarkMode ? "#333" : "#fff",
    color: isDarkMode ? "#fff" : "#000",
  };

  if (videos === null || videos === undefined) {
    return (
      <Stack direction={direction || "row"} gap={2}>
        {[...Array(10)].map((_, idx) => (
          <Box key={idx} width="100%">
            <Skeleton variant="rectangular" width={300} height={180} />
          </Box>
        ))}
      </Stack>
    );
  }

  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      justifyContent="start"
      alignItems="start"
      gap={2}
      sx={boxStyle}
    >
      {videos.map((item, idx) => (
        <Box key={idx}>{item.id.videoId && <VideoCard video={item} />}</Box>
      ))}
      {loading &&
        [...Array(4)].map((_, idx) => (
          <Box key={idx}>
            <Skeleton variant="rectangular" width={300} height={180} />
            <Skeleton width="60%" />
            <Skeleton width="40%" />
          </Box>
        ))}
    </Stack>
  );
};

Videos.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.object),
  drawerOpen: PropTypes.bool.isRequired,
  direction: PropTypes.oneOf(["row", "column"]),
  loading: PropTypes.bool.isRequired,
};

export default Videos;
