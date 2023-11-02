import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import newtrophy from "@/assets/images/newtrophy.png";

import { useEffect, useRef, useState } from "react";

const PickWinner = ({ commentData, contestData, decrement, posts }) => {
  console.log(posts)
  const [loading, setLoading] = useState(false); // State to track loading
  const router = useRouter();
  const tweetElementRef = useRef(null);

  const serializedData =
  commentData && encodeURIComponent(JSON.stringify(commentData?.data));
 
 

  const handleNavigation = () => {
    // Store data in localStorage before navigating
    localStorage.setItem("myData", serializedData);
    router.push(
      `${commentData
        ? `/youtube/winners?data=${serializedData}`
        : "/youtube/giveaway"
      }`
    );
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
              <Box className='ytpostContainer'> <YoutubePost posts={posts}/></Box> 

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
        {posts &&  <Box>
            <img alt="trophy" className="trophy1" src='/newtrophy.png' />
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
          </Box>}
        </div>
      </div>
    </>
  );
};

export default PickWinner;
const YoutubePost = ({posts}) => {
  return (
    <Box className="ytwinner">
      <img src={posts?.thumbnails}  className="ytPostImg" />
      <Box className='InstaPostDetails'> 
      
      <Typography className="ytvideoTitle">{posts?.titleVideo}</Typography>

      <Typography className="ytViews">{posts?.viewCount} views . 5 years ago </Typography>
      </Box>
     
    </Box>
  );
};

export const YTSidePost = ({posts, contestData}) => {
  return (
    <Box className="ytpostSmall">
      <img img src={posts?.thumbnails}  className="ytPostSmall" />
      <Box sx={{ paddingLeft:'5px'}} className=''> 
      
      <Typography sx={{color:'black'}} className="ytvideoTitle  ytViewsSmall">{posts?.titleVideo} </Typography>

      <Typography  className="ytViews ytViewsSmall">{posts?.viewCount} views . 5 years ago </Typography>
      </Box>
     
    </Box>
  );
};