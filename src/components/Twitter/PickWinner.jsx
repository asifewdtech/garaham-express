import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import { useRouter } from 'next/router';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useState } from "react";


const PickWinner = ({ commentData, decrement, posts }) => {
  const [loading, setLoading] = useState(false); // State to track loading
  const router = useRouter();

  
  const handleNavigation = () => {
    let serializedData = commentData && encodeURIComponent(JSON.stringify(commentData));
    if (serializedData === "undefined") {
      localStorage.setItem("myData", serializedData);
      router.push(`${commentData ? `/twitter/winners?data=` : "/twitter/giveaway"}`);
    }
    else {
      router.push(`${commentData ? `/twitter/winners?data=${serializedData}` : "/twitter/giveaway"}`);
    }
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
          <div className="pickWinner_lg" >
            <Box sx={{ width: 'fit-content', margin: 'auto' }}>
            <Box>
          <img alt="trophy" className="trophy1" src='/newtrophy.png' />

        </Box>



              <Typography className="twitter_select_text">Your winner will be chosen on the set time and date</Typography>
              <Box className="text-center"  >
                <Button id='twitter_next_btn' disableTouchRipple onClick={handleNavigation} variant="contained" className="save_btn">
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
            <img alt="trophy" className="trophy1" src='/newtrophy.png' />
            <div className="text-center">
              <Button disableTouchRipple onClick={handleNavigation} variant="contained" className="save_btn">
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

const TwitterIcons = ({ tweetLink, width, height }) => {
  const icons = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
          <path
            d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01"
            stroke="#535f69"
            fill="transparent"
            stroke-width="2"
          />
        </svg>
      ),
      link: tweetLink,
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
          <path
            d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"
            stroke="#535f69"
            fill="#535f69"
            stroke-width="0.5"
          />
        </svg>
      ),
      link: tweetLink,
    },
    {
      icon: (
        <svg xmlns="http://w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
          <path
            d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01 .896 1.81.846 4.17-.514 6.67z"
            stroke="#535f69"
            fill="#535f69"
            stroke-width="0.5"
          />
        </svg>
      ),
      link: tweetLink,
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
          <path
            d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"
            stroke="#535f69"
            fill="#535f69"
            stroke-width="0.5"
          />
        </svg>
      ),
      link: tweetLink,
    },
  ];

  return (
    <div className="tweet_actions">
      {icons.map((icon, index) => (
        <a key={index} href={icon.link} target="_blank" rel="noopener noreferrer">
          {icon.icon}
        </a>
      ))}
    </div>
  );
};

export const TwitterPost = ({ posts }) => {
  
  return (< >
    <Typography className="postText">This is an edited tweet, we are testing it </Typography>
    <div className="timeline">
      <BorderColorIcon />
      <Typography>Last edited 8:55 AM . 5/12/12 . Twitter for iPhone</Typography>
    </div>
    <div className="likes_count border_tb">
      <strong>4</strong> <span className="likes">likes</span>
    </div>
    <TwitterIcons width={30} height={20} />
    <img className="PWinner_trophy" src="/newwinnertrophy.png" alt="" />
  </>)
}

export const SideTwitterPost = () => {
  return (< >
    <Typography className="sP_text">This is an edited tweet, we are testing it </Typography>
    {/* timeline */}
    <div style={{ marginTop: '5px' }} className="timeline_sm">
      <BorderColorIcon className="timeline_sm" />
      <Typography className="timeline_sm">Last edited 8:55 AM . 5/12/12 . Twitter for iPhone</Typography>
    </div>
    {/* likes */}
    <div className="sP_text border_tb  " style={{ paddingLeft: '5px' }}>
      <strong>4</strong> <span className="likes">likes</span>
    </div>
    {/* action icons */}

    <TwitterIcons width={20} height={15} />






  </>)
}