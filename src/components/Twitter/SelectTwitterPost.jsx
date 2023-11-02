import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import axios from "axios";


const SelectTwitterPost = ({ increment, setContestData, contestData }) => {
  const [postLink, setPostLink] = useState(""); 
  const handlePageChange = (e) => {
    const selectedValue = e.target.value;
    setPostLink(selectedValue);
    localStorage.removeItem("selectedConditions");
    localStorage.removeItem("selectedPost");
  };
  useEffect(() => {
    
    const postLink = localStorage.getItem("postLink");

    if (postLink) {
      
      setPostLink(JSON.parse(postLink));
    }

  }, []);
  const fetchPostData=async ()=>{
    const formData= new FormData()
    formData.append("twitter_url", postLink);
  
    try {
      const response = await axios.post(
        "http://localhost/viralyIO/api/includes/actions.php",
        formData
      );
      console.log(response)
      if (response?.data.success) {
        // setPosts(response?.data.data);
        localStorage.setItem("posts", JSON.stringify(response?.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleScanButtonClick = (e) => {
    // Regular expression to validate a Twitter post link
    const twitterPostLinkRegex = /^https?:\/\/twitter\.com\/[^/]+\/status\/\d+/;
    localStorage.setItem("postLink", JSON.stringify(postLink));
    if (twitterPostLinkRegex.test(postLink)) {
      setContestData((prev) => ({
        ...prev,
        link: postLink, 
        postText: "",
        img: "",
        conditions: {},
      }));
      increment(e);
      fetchPostData()
    } else {
      // Display an error message or perform other validation handling here
      alert("Invalid Twitter post link. Please enter a valid Twitter post URL.");
    }
  };

  return (
    <Box className='p_sm' >
      <Typography id='main_heading' className="CP_heading">Paste The Link Of Your Twitter Post</Typography>
      <Typography style={{ paddingLeft: 0 }} className="CP_sub_heading">
        Copy the URL of the Twitter post that you would like to pick a comment from and paste it in the field below
      </Typography>
      <Box sx={{ display: 'flex', gap: 3 }} className="sm_col">
        <input
          id="link_input"
          type="text"
          className="select_page"
          name="page"
          onChange={(e) => handlePageChange(e)}
          value={postLink}
          placeholder="Enter Your Twitter Post URL"
        />
        {/* <Link href="#"> */}
          <Button
            style={{ marginTop: 0 }}
            disableTouchRipple
            disabled={!postLink}
            variant="contained"
            className="save_btn"
            onClick={handleScanButtonClick}
          >
            Scan
          </Button>
        {/* </Link> */}
      </Box>
    </Box>
  );
};

export default SelectTwitterPost;
