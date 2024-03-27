import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import VideoDetail from "./components/VideoDetail";
import ChannelDetail from "./components/ChannelDetail";
import SearchFeed from "./components/SearchFeed";
// import Videos from "./components/Videos";
import Feed from "./components/Feed";
import { useState } from "react";

function App() {
  const [openDrawer, setOpenDrawer] = useState(true);
  return (
    <BrowserRouter>
      <Box>
        <Navbar setOpenDrawer={setOpenDrawer} open={openDrawer} />

        <Routes>
          <Route path="/" element={<Feed openDrawer={openDrawer} />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/channel/:id" element={<ChannelDetail />} />
          <Route path="/search/:searchTerm" element={<SearchFeed />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
