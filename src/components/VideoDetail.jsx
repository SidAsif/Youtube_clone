import * as React from "react";
import {
  Alert,
  Avatar,
  Box,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Snackbar,
  Stack,
  Typography,
  FormControl,
  Input,
  InputAdornment,
  Button,
} from "@mui/material";
import {
  AccountCircle,
  CheckCircle,
  ContentCopy,
  ExpandMore,
  MoreVert,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import { ApiFetch } from "../assets/ApiFetch";
import Videos from "./Videos";
import Loader from "./Loader";
import "../index.css";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "./firebaseConfig";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function VideoDetail() {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const initialCommentsToShow = 10;
  const [threedotOpen, setThreedotOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [copied, setCopied] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    // Fetch video details and related videos
    ApiFetch(`videos?part=snippet,statistics&id=${id}`).then((data) => {
      setVideoDetail(data.items[0]);
    });
    ApiFetch(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    );

    // Fetch comments from YouTube API
    ApiFetch(
      `commentThreads?part=snippet&videoId=${id}&maxResults=${initialCommentsToShow}`
    ).then((data) => {
      const ytComments = data.items.map((item) => ({
        id: item.id,
        author: item.snippet.topLevelComment.snippet.authorDisplayName,
        text: item.snippet.topLevelComment.snippet.textOriginal,
        avatar: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
        timestamp: item.snippet.topLevelComment.snippet.publishedAt,
        source: "youtube",
      }));
      setComments(ytComments);
    });

    // Fetch comments from Firebase
    const fetchFirebaseComments = async () => {
      const q = query(
        collection(firestore, "comments"),
        where("videoId", "==", id)
      );
      const querySnapshot = await getDocs(q);
      const fbComments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        source: "firebase",
      }));
      setComments((prevComments) => [...prevComments, ...fbComments]);
    };

    fetchFirebaseComments();
  }, [id]);

  const handleSeeMoreComments = () => {
    setShowAllComments(true);
    ApiFetch(`commentThreads?part=snippet&videoId=${id}`).then((data) => {
      const ytComments = data.items.map((item) => ({
        id: item.id,
        author: item.snippet.topLevelComment.snippet.authorDisplayName,
        text: item.snippet.topLevelComment.snippet.textOriginal,
        avatar: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
        timestamp: item.snippet.topLevelComment.snippet.publishedAt,
        source: "youtube",
      }));
      setComments((prevComments) => [...prevComments, ...ytComments]);
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${id}`);
    setCopied(true);
    setToastOpen(true);
    setTimeout(() => {
      setCopied(false);
      setToastOpen(false);
    }, 2000);
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      const newCommentData = {
        id: Date.now().toString(), // Generate a unique ID (temporary)
        author: "Anonymous", // Replace with actual user data if available
        text: newComment,
        avatar: "https://example.com/avatar.jpg", // Replace with actual avatar URL if available
        timestamp: new Date(),
        source: "firebase", // Assuming comments added through Firebase
      };

      // Add new comment to Firestore
      await addDoc(collection(firestore, "comments"), {
        videoId: id,
        ...newCommentData,
      });

      // Update comments state to prepend new comment
      setComments((prevComments) => [newCommentData, ...prevComments]);

      // Clear input field
      setNewComment("");
    }
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
              <Link
                to={`/channel/${channelId}`}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CardMedia
                  image={videoDetail?.snippet?.thumbnails?.default?.url}
                  alt={videoDetail?.snippet?.channelTitle}
                  sx={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
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
                <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                  <MoreVert />
                </IconButton>
                <Menu
                  id="demo-positioned-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem onClick={handleOpen}>Share</MenuItem>
                  <MenuItem>Watch Later</MenuItem>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Video Link
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <Typography id="modal-modal-description">
                          {`https://www.youtube.com/watch?v=${id}`}
                        </Typography>
                        <IconButton onClick={handleCopyLink} sx={{ ml: 1 }}>
                          <ContentCopy />
                        </IconButton>
                      </Box>
                    </Box>
                  </Modal>
                  <Snackbar
                    open={toastOpen}
                    autoHideDuration={2000}
                    onClose={() => setToastOpen(false)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <Alert
                      severity="success"
                      variant="filled"
                      sx={{ backgroundColor: "black", color: "white" }}
                    >
                      Link copied to clipboard
                    </Alert>
                  </Snackbar>
                </Menu>
              </Stack>
            </Stack>
          </Box>

          <Stack sx={{ mt: "10px" }}>
            <Typography variant="h6">Comments</Typography>
            <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
              <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </FormControl>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="text"
                onClick={() => setNewComment("")}
                style={{ color: "black" }}
                sx={{ mr: 2 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddComment}
              >
                Comment
              </Button>
            </Box>

            {comments
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
              .slice(
                0,
                showAllComments ? comments.length : initialCommentsToShow
              )
              .map((comment) => (
                <Box key={comment.id} display="flex" alignItems="center" mb={1}>
                  <Avatar
                    src={comment.avatar}
                    alt="Avatar"
                    sx={{ width: "25px", height: "25px", marginTop: "-20px" }}
                  />
                  <Box ml={1}>
                    <Typography variant="subtitle1">
                      {comment.author}
                    </Typography>
                    <Typography sx={{ mb: "10px" }}>{comment.text}</Typography>
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
