import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import newtrophy from "@/assets/images/newtrophy.png";

import { useEffect, useRef, useState } from "react";

const PickWinner = ({ contestData, decrement }) => {
  const [loading, setLoading] = useState(false); // State to track loading
  const router = useRouter();
  const tweetElementRef = useRef(null);

  const serializedData =
    contestData && encodeURIComponent(JSON.stringify(contestData?.data));
  const tweetElement = document.getElementById("tweet");
  console.log("tweetElement:", tweetElementRef.current);
  useEffect(() => {
    const tweetURL = contestData.link;
    const tweetID = extractTweetIDFromURL(tweetURL);

    if (tweetID) {
    }
  }, [contestData]);

  const handleNavigation = () => {
    // Store data in localStorage before navigating
    localStorage.setItem("myData", serializedData);
    router.push(
      `${contestData
        ? `/facebook/winners?data=${serializedData}`
        : "/facebook/giveaway"
      }`
    );
  };

  // Function to extract the tweet ID from the URL
  const extractTweetIDFromURL = (url) => {
    const tweetURLParts = url.split("/");
    if (tweetURLParts.length >= 5) {
      return tweetURLParts[5];
    }
    return null;
  };

  return (
    <>
      <Typography className="CP_heading">
        Click on the button to choose a comment!
      </Typography>
      <div style={{}}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <div className="pickWinner_lg">
            <Box
              sx={{
                // width: "fit-content",
                width:'60%',
                margin: "auto",
                textJustify: "center",
              }}
            >
              <Box
                ref={tweetElementRef}
                sx={{
                  position: "relative",
                  width: "fit-content",
                  margin: "auto",
                  textJustify: "center",
                  marginTop: "39px",
                }}
              >
              <Box className='ytpostContainer'> <YoutubePost /></Box> 

                <img
                  className="PWinner_trophy yttrophy"
                  src="/newwinnertrophy.png"
                  alt=""
                />
              </Box>
              <Typography  className=" yt_annoucement twitter_select_text">Your winner will be chosen on the set time and date</Typography>
           
              <Box className="text-center">
                <Button
                  id="twitter_next_btn"
                  disableTouchRipple
                  onClick={handleNavigation}
                  variant="contained"
                  className="save_btn"
                >
                  Choose a Winner
                </Button>
              </Box>
            </Box>
            <Button
              disableTouchRipple
              variant="contained"
              className="go_back"
              onClick={decrement}
              id="twitter_back_btn"
            >
              Go Back
            </Button>
          </div>
        )}

        <div className="pickWinner_sm" style={{ textAlign: "center" }}>
          <Box>
            <Image alt="trophy" className="trophy1" src={newtrophy} />
            <div className="text-center">
              <Button
                disableTouchRipple
                onClick={handleNavigation}
                variant="contained"
                className="save_btn"
              >
                Choose a Winner
              </Button>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
};

export default PickWinner;
const YoutubePost = () => {
  return (
    <Box className="ytwinner">
      <img src="/yt2.png"  className="ytPostImg" />
      <Box className='InstaPostDetails'> 
      
      <Typography className="ytvideoTitle">Amazon Rainforest 🌿 | Adventure of a Lifetime!</Typography>

      <Typography className="ytViews">13211 views . 5 years ago </Typography>
      </Box>
     
    </Box>
  );
};

export const YTSidePost = () => {
  return (
    <Box className="ytpostSmall">
      <img src="/yt2.png"  className="ytPostSmall" />
      <Box sx={{ paddingLeft:'5px'}} className=''> 
      
      <Typography sx={{color:'black'}} className="ytvideoTitle  ytViewsSmall">Amazon Rainforest 🌿 | Adventure of a Lifetime! </Typography>

      <Typography  className="ytViews ytViewsSmall">13211 views . 5 years ago </Typography>
      </Box>
     
    </Box>
  );
};