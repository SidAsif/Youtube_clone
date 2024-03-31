import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import { ApiFetch } from "../assets/ApiFetch";
import Videos from "./Videos";
import { CheckCircle, ExpandMore } from "@mui/icons-material";
import Loader from "./Loader";
import "../index.css";

export default function VideoDetail() {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);
  const initialCommentsToShow = 10;
  useEffect(() => {
    ApiFetch(`videos?part=snippet,statistics&id=${id}`).then((data) => {
      setVideoDetail(data.items[0]);
    });
    ApiFetch(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    );

    ApiFetch(
      `commentThreads?part=snippet&videoId=${id}&maxResults=${initialCommentsToShow}`
    ).then((data) => {
      setComments(data.items);
    });
  }, [id]);
  const handleSeeMoreComments = () => {
    setShowAllComments(true);
    ApiFetch(`commentThreads?part=snippet&videoId=${id}`).then((data) => {
      setComments(data.items);
    });
  };
  if (!videoDetail?.snippet) return <Loader />;
  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;
  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1} ml={5} className="Detailvideo">
          <Box
            sx={{
              width: "100%",
              // height: "50%",
              position: "static",
              top: "86px",
              marginTop: "86px",
            }}
          >
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color="black" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "black" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color="black"
                >
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "black", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
          <Stack sx={{ mt: "10px" }}>
            <Typography variant="h6">Comments</Typography>
            <hr
              style={{
                border: "none",
                borderBottom: "1px solid #ccc",
                margin: "1rem 0",
              }}
            />
            {comments
              .slice(
                0,
                showAllComments ? comments.length : initialCommentsToShow
              )
              .map((comment) => (
                <Box key={comment.id} display="flex" alignItems="center" mb={1}>
                  <Avatar
                    src={
                      comment.snippet.topLevelComment.snippet
                        .authorProfileImageUrl
                    }
                    alt="Avatar"
                    sx={{ width: "25px", height: "25px", marginTop: "-20px" }}
                  />
                  <Box ml={1}>
                    <Typography variant="subtitle1">
                      {
                        comment.snippet.topLevelComment.snippet
                          .authorDisplayName
                      }
                    </Typography>
                    <Typography sx={{ mb: "10px" }}>
                      {comment.snippet.topLevelComment.snippet.textOriginal}
                    </Typography>
                  </Box>
                </Box>
              ))}
            {!showAllComments && (
              <IconButton onClick={handleSeeMoreComments}>
                <ExpandMore />
              </IconButton>
            )}
          </Stack>
        </Box>
        <Box
          mt={10}
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
}
