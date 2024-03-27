import { Stack, Box } from "@mui/material";
import PropTypes from "prop-types";
import VideoCard from "./VideoCard";


const Videos = ({ videos, drawerOpen, direction }) => {
  if (videos === null || videos === undefined) {
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
