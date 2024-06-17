import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Avatar,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const SignInCard = ({ onSignIn }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card sx={{ minWidth: 275, maxWidth: 400 }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Avatar
              sx={{ width: 56, height: 56 }}
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            />
          </Box>
          <Typography
            variant="h5"
            component="div"
            sx={{ textAlign: "center", mb: 2 }}
          >
            Welcome!
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", mb: 2 }}
          >
            Please sign in to continue
          </Typography>
          <Button
            variant="contained"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={onSignIn}
            sx={{
              backgroundColor: "#4285F4",
              color: "#fff",
              "&:hover": { backgroundColor: "#357ae8" },
            }}
          >
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignInCard;
