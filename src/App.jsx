import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/firebaseConfig";
import Navbar from "./components/Navbar";
import VideoDetail from "./components/VideoDetail";
import ChannelDetail from "./components/ChannelDetail";
import SearchFeed from "./components/SearchFeed";
import Feed from "./components/Feed";
import SignInCard from "./components/SignInCard";
import "./App.css";

function App() {
  const [openDrawer, setOpenDrawer] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return <SignInCard />;
  }

  return (
    <BrowserRouter>
      <Box>
        <Navbar setOpenDrawer={setOpenDrawer} open={openDrawer} user={user} />
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
