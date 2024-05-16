import { CheckCircle } from "@mui/icons-material";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../assets/material";
import PropTypes from "prop-types";

export default function VideoCard({
  video: {
    id: { videoId },
    snippet,
  },
  drawerOpen,
}) {
  return (
    <Card
      sx={{
        ml: { md: 1 },
        width: {
          xs: "100%",
          sm: drawerOpen ? "358px" : "100%",
          md: drawerOpen ? "400px" : "330px",
        },

        boxShadow: "none",
      }}
    >
      <Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hKfY`}>
        <CardMedia
          image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
          alt={snippet?.title}
          sx={{
            width: "100%",
            height: 180,
            objectFit: "cover",
            borderRadius: "12px",
            "&:hover": {
              borderRadius: 0,
            },
          }}
        />
      </Link>

      <CardContent sx={{ backgroundColor: "white", height: "106px" }}>
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="subtitle1" fontWeight="bold" color="black">
              {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
            </Typography>
          </div>
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
            image={snippet?.thumbnails?.default?.url || demoChannelLogoUrl}
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
}
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
      }),
      title: PropTypes.string.isRequired,
      channelId: PropTypes.string,
      channelTitle: PropTypes.string,
    }),
  }).isRequired,
  drawerOpen: PropTypes.bool.isRequired,
};
