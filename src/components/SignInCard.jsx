import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Avatar,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebaseConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";

const SignInCard = () => {
  const dispatch = useDispatch();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      dispatch(
        setUser({
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
          uid: user.uid,
        })
      );

      toast.success("Signed in successfully!");
    } catch (error) {
      toast.error(`Sign in failed: ${error.message}`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        backgroundImage: "linear-gradient(135deg, #f5f5f5 25%, #e0e0e0 100%)",
      }}
    >
      <Card
        sx={{
          minWidth: 300,
          maxWidth: 400,
          p: 3,
          borderRadius: 2,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          backgroundImage: "linear-gradient(135deg, #ffffff 25%, #fafafa 100%)",
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Avatar
              sx={{ width: 72, height: 72 }}
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            />
          </Box>
          <Typography
            variant="h5"
            component="div"
            sx={{ textAlign: "center", mb: 2, fontWeight: "bold" }}
          >
            Welcome!
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", mb: 3 }}
          >
            Please sign in to continue
          </Typography>
          <Button
            variant="contained"
            fullWidth
            startIcon={<GoogleIcon />}
            sx={{
              backgroundColor: "#4285F4",
              color: "#fff",
              "&:hover": { backgroundColor: "#357ae8" },
              py: 1.5,
              fontSize: "1rem",
              textTransform: "none",
            }}
            onClick={handleGoogleSignIn}
          >
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
      <ToastContainer />
    </Box>
  );
};

export default SignInCard;
