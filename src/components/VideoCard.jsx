import React from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { CheckCircle } from "@mui/icons-material";

import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../assets/material";

const VideoCard = ({
  video: {
    id: { videoId },
    snippet,
  },
  drawerOpen,
}) => {
  const isDarkMode = useSelector((state) => state.darkMode.value);

  const cardStyle = {
    ml: { md: 1 },
    width: {
      xs: "100%",
      sm: drawerOpen ? "358px" : "100%",
      md: drawerOpen ? "400px" : "330px",
    },
    boxShadow: "none",
    bgcolor: isDarkMode ? "#333" : "white",
    color: isDarkMode ? "#fff" : "black",
  };

  const hoverStyle = {
    borderRadius: "12px",
    "&:hover": {
      borderRadius: "0",
    },
  };

  return (
    <Card sx={cardStyle}>
      <Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hKfY`}>
        <CardMedia
          image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
          alt={snippet?.title}
          sx={{
            width: "100%",
            height: 180,
            objectFit: "cover",
            ...hoverStyle,
          }}
        />
      </Link>

      <CardContent sx={{ height: "106px" }}>
        <Link
          to={videoId ? `/video/${videoId}` : demoVideoUrl}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
          </Typography>
        </Link>

        <Link
          to={
            snippet?.channelId
              ? `/channel/${snippet?.channelId}`
              : demoChannelUrl
          }
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <CardMedia
            image={snippet?.thumbnails?.default?.url}
            alt={snippet?.channelTitle}
            sx={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              marginRight: "10px",
            }}
          />
          <Typography variant="subtitle2" color="gray">
            {snippet?.channelTitle || demoChannelTitle}
            <CheckCircle sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

VideoCard.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.shape({
      videoId: PropTypes.string.isRequired,
    }),
    snippet: PropTypes.shape({
      thumbnails: PropTypes.shape({
        high: PropTypes.shape({
          url: PropTypes.string.isRequired,
        }),
        default: PropTypes.shape({
          url: PropTypes.string,
        }),
      }),
      title: PropTypes.string.isRequired,
      channelId: PropTypes.string,
      channelTitle: PropTypes.string,
    }),
  }).isRequired,
  drawerOpen: PropTypes.bool.isRequired,
};

export default VideoCard;
