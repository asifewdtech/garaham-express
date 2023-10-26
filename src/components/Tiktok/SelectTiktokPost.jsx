import { useState, useEffect } from "react";
import { Box, Button, MenuItem, Typography } from "@mui/material";
import Link from "next/link";
import axios from "axios";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const SelectTiktokPost = ({ increment, setContestData, contestData }) => {
  const [showGuide, setshowGuide] = useState(false)
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
    } else {
      // Display an error message or perform other validation handling here
      alert(
        "Invalid Twitter post link. Please enter a valid Twitter post URL."
      );
    }
  };

  return (
    <Box className="p_sm">
      <Typography id="main_heading" className="CP_heading">
        Paste The Link Of Your TikTok Video
      </Typography>
      <Typography style={{ paddingLeft: 0 }} className="CP_sub_heading">
        Copy the url of the TikTok Video post that you would like to pick a
        comment from and paste it in the field bellow
      </Typography>
      <Box sx={{ display: "flex", gap: 3 }} className="sm_col">
        <input
          id="link_input"
          type="text"
          className="select_page"
          name="page"
          onChange={(e) => handlePageChange(e)}
          value={postLink}
          placeholder="Enter Your TikTok Post URL"
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

      <div onClick={()=>{setshowGuide(!showGuide)}} className=" tiktok_guid  select_scrollbar">
        <div   className="text">How To Find Your TikTok Video Link</div> 
      {showGuide &&<Box id='decimal_li' > <ol id="">
        <li>Open TikTok app or browser.</li>
        <li>Navigate to TikTok video.</li>
        <li>Press [...] or Share.</li>
        <li>Press Copy link.</li>
      </ol></Box> }
    
      </div>

     
    </Box>
  );
};

export default SelectTiktokPost;
