import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import newtrophy from "@/assets/images/newtrophy.png";

import { useEffect, useRef, useState } from "react";
import {FaMusic} from 'react-icons/fa'
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
              <Box className='tiktokpostContainer'>
                 <img  className="tiktokVideo" src="/instawinner.png"/></Box> 

                <img
                style={{top:'-49px'}}
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
export const TikTokSidePost = () => {
  return (
    <Box className="tiktokwinner">
     <div><img src="/postImg.png"  className="tiktokPostVideo" /></div>  
      <Box className='tiktokPostDetails'> 
      <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <img  className="tiktokProfileImg" src="/winner.png"/>
        <div className="UserName">
          <Typography sx={{ color:'black', fontSize:'10px'}}>MyNAmeIS</Typography>
          <Typography sx={{ fontSize:'8px'}}>balkanand . 9-7</Typography>
        </div>
        <button className=" follow_button">
          Follow
        </button>
      </Box>
      {/* <Typography className="instaPostLikes">140 likes</Typography> */}
      <Typography sx={{fontSize:'8px', lineBreak:'anywhere', color:'rgba(22, 24, 35, 1)'}}  > {shortenText("nek menang sound tak jak ngopi wes 😂😂🤣🤣 #fypシ #fyp #fypage #fypシ゚viral #sengkuniledalede #sengkuni")} </Typography>
      <Typography sx={{fontSize:'8px', marginTop:'5px', color:'#77787e'}} >
      <FaMusic />  4 comments</Typography>
      </Box>
     
    </Box>
  );
};
function shortenText(text) {
  let maxLength=60
  if (text.length > maxLength) {
      return text.slice(text.length - maxLength)+ "..." ;
  }
  return text;
}