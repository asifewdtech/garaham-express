import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import axios from "axios";


const SelectInstaPost = ({ increment, setPosts, setContestData, contestData }) => {
  const [postLink, setPostLink] = useState(""); 
  const handlePageChange = (e) => {
    localStorage.clear()
    const selectedValue = e.target.value;
    setPostLink(selectedValue);
    const postLink = localStorage.setItem("postLink",selectedValue);
   
  };
  useEffect(() => {
    
    const postLink = localStorage.getItem("postLink");

    if (postLink) {
      
      setPostLink(JSON.parse(postLink));
    }

  }, []);


  const handleScanButtonClick = (e) => {
    // Regular expression to validate a Twitter post link
    const instagramPostLinkRegex = /^https?:\/\/(?:www\.)?instagram\.com\/p\/[A-Za-z0-9_-]+\/?/;

    localStorage.setItem("postLink", JSON.stringify(postLink));
    if (instagramPostLinkRegex.test(postLink)) {
      setContestData((prev) => ({
        ...prev,
        link: postLink, 
        postText: "",
        img: "",
        conditions: {},
      }));
      handlePage()
      increment(e);
      
    } else {
      // Display an error message or perform other validation handling here
      alert("Invalid Instagram post link. Please enter a valid  post URL.");
    }
  };
  
  const handlePage = async (id) => {
    const formData = new FormData();

    formData.append("page_id", postLink);
    formData.append("resource", "instagram");

    try {
      const response = await axios.post(
        "http://localhost/viralyIO/api/includes/actions.php",
        formData
      );
      // console.log(response)
      if (response?.data.success) {
        const post= response?.data.data
        setPosts(post);
        localStorage.setItem("postDetails", JSON.stringify(post));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className='p_sm' >
      <Typography id='main_heading' className="CP_heading">Paste The Link Of Your Instagram Post</Typography>
      <Typography style={{ paddingLeft: 0 }} className="CP_sub_heading">
      Copy the url of the Instagram post that you would like to pick a comment from and paste it in the field bellow </Typography>
      <Box sx={{ display: 'flex', flexWrap:'wrap', gap: 3 }} className="sm_col">
        <input
          id="link_input"
          type="text"
          className="select_page"
          name="page"
          onChange={(e) => handlePageChange(e)}
          value={postLink}
          placeholder="Enter Your Instagram Post URL"
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

export default SelectInstaPost;
