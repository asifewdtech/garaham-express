import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import { useRouter } from 'next/router';

const PickWinner = ({ commentData }) => {
  const serializedData = commentData && encodeURIComponent(JSON.stringify(commentData?.data));
  const router = useRouter();

  const handleNavigation = () => {
    
    // Store data in localStorage before navigating
    localStorage.setItem("myData", serializedData);
    router.push(`${commentData ? `/facebook/winners?data=${serializedData}` : "/facebook/giveaway"}`);
  };

  return (
    <>
      <Typography className="CP_heading">
        Clik on the button to choose a comment!
      </Typography>
      <div style={{ textAlign: "center" }}>
        <Box>
          <img alt="trophy" className="trophy1" src='/newtrophy.png' />
          <div className="text-center">
            <Button disableTouchRipple  onClick={handleNavigation} variant="contained" className="save_btn">
              Choose a Winner
            </Button>
          </div>
        </Box>
      </div>
    </>
  );
};

export default PickWinner;
