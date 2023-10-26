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
                width: "fit-content",
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
              <Box className='postContainer'> <InstaPost /></Box> 

                <img
                  className="PWinner_trophy"
                  src="/newwinnertrophy.png"
                  alt=""
                />
              </Box>
             
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
const InstaPost = () => {
  return (
    <Box className="instawinner">
      <img src="/postImg.png"  className="instaPostImg" />
      <Box className='InstaPostDetails'> 
      <InstaLinks />
      <Typography className="instaPostLikes">140 likes</Typography>
      <Typography className="instapostText">Post content will go here 😍😋</Typography>
      <Typography sx={{fontSize:'12px'}} className="likes">4 comments</Typography>
      </Box>
     
    </Box>
  );
};

const InstaLinks = () => {
  return (
    <Box sx={{ display:'flex', justifyContent:"space-between"}}>
      <Box sx={{ display:'flex', justifyContent:"space-between", gap:'10px'}}>
        <div>
          <svg
            width="22"
            height="22"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path  fill="white" d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938" stroke="black" strokeWidth="2"/>
          </svg>
        </div>
        <div>
          <svg
            width="22"
            height="22"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path  fill="white" d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" stroke="black" strokeWidth="2"/>
          </svg>
        </div>
        <div></div>
        <svg
          width="22"
          height="22"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <line
            fill="white"
            stroke="black"
            stroke-linejoin="round"
            strokeWidth="2"
            x1="22"
            x2="9.218"
            y1="3"
            y2="10.083"
          ></line>
          <polygon
            fill="none"
            points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
            stroke="black"
            stroke-linejoin="round"
            strokeWidth="2"
          ></polygon>
        </svg>
      </Box>

      {/* right icon  */}
      <div>
        <svg width="22"
          height="22" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        </svg>
      </div>
    </Box>
  );
};
