import { Stack, Box, Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import VideoCard from "./VideoCard";

const Videos = ({ videos, drawerOpen, direction }) => {
  if (videos === null || videos === undefined) {
    return (
      <Stack direction={direction || "row"} gap={2}>
        {[...Array(10)].map((_, idx) => (
          <Box key={idx} width="100%">
            <Skeleton variant="rectangular" width={330} height={180} />
          </Box>
        ))}
      </Stack>
    );
  }

  if (videos.length === 0) {
    return <div>No videos found.</div>;
  }

  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      justifyContent="start"
      alignItems="start"
      gap={2}
    >
      {videos.map((item, idx) => (
        <Box key={idx}>
          {item.id.videoId && (
            <VideoCard video={item} drawerOpen={drawerOpen} />
          )}
        </Box>
      ))}
    </Stack>
  );
};

Videos.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.object),
  drawerOpen: PropTypes.bool.isRequired,
  direction: PropTypes.oneOf(["row", "column"]),
};

export default Videos;
