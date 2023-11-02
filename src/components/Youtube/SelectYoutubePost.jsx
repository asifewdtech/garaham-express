import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import axios from "axios";


const SelectYoutubePost = ({ increment,setPosts, setContestData, contestData }) => {
  const [postLink, setPostLink] = useState(""); 
  const [loading, setloading] = useState(false)
  const handlePageChange = (e) => {
    localStorage.clear()
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


  const handleScanButtonClick = (e) => {
    // Regular expression to validate a Twitter post link
    const youtubeVideoLinkRegex = /https?:\/\/(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)|https?:\/\/(www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/;

    localStorage.setItem("postLink", JSON.stringify(postLink));
    if (youtubeVideoLinkRegex.test(postLink)) {
      setContestData((prev) => ({
        ...prev,
        link: postLink, 
        postText: "",
        img: "",
        conditions: {},
      }));
   
      fetchPostData(e);
    } else {alert("Invalid Twitter post link. Please enter a valid video URL.");
    }
  };
  const fetchPostData=async (e)=>{
  
    setloading(true)
    const formData= new FormData()
    formData.append("video_url", postLink);
  
    try {
      const response = await axios.post(
        "http://localhost/viralyIO/api/includes/actions.php",
        formData
      );
      console.warn(response.data)
      // console.log(response.data.data)
      if (response?.data.success) {
        const postdetails=  response.data.data
        setloading(false)
        setContestData((prev) => {
          return { ...prev, post: postdetails };
        });
        // setPosts(postdetails);
        localStorage.setItem("ytpostDetails", JSON.stringify(postdetails));
        increment(e);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Box className='p_sm' >
      <Typography id='main_heading' className="CP_heading">Paste The Link Of Your YouTube Video</Typography>
      <Typography style={{ paddingLeft: 0 }} className="CP_sub_heading">
      Copy the url of the YouTube Video post that you would like to pick a comment from and paste it in the field bellow</Typography>
      <Box sx={{ display: 'flex', gap: 3 }} className="sm_col">
        <input
          id="link_input"
          type="text"
          className="select_page"
          name="page"
          onChange={(e) => handlePageChange(e)}
          value={postLink}
          placeholder="Enter Your YouTube Video URL"
        />
        {/* <Link href="#"> */}
          <Button
        
            style={{ marginTop: 0 }}
            disableTouchRipple
            disabled={!postLink || loading}
            variant="contained"
            className="save_btn"
            onClick={handleScanButtonClick}
          >
           {loading?"Scanning": "Scan"}
          </Button>
        {/* </Link> */}
      </Box>
    </Box>
  );
};

export default SelectYoutubePost;
