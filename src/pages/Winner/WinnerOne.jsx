import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
const WinnerOne = ({count}) => {
  const [showEntries, setshowEntries] = useState(false);
  return (
    <div className="main">
      <Typography className="winner_count">{count}</Typography>
    <div>
      <Box className="trophy_Container">
        <img className="trophy" src="/trophy.png" alt="trophy" />
        <div id="rect">
          <img className="rect_img" src="/rect.png" alt="name" />
        </div>

        <Typography className="name">Graham Caldwell</Typography>
      </Box>

    </div>
  
      
      <Box className="winner_comment">
        <img src="/winner.png" width="73" height="73" alt="winner"  className="winner_img"/>
        <Typography element="p" id="name">
          Graham Caldwell
        </Typography>
        <Typography id="cmnt">Test Comment 🎈🎊🎉</Typography>
        <div
          id="ellipse"
          onMouseOut={() => {
            setshowEntries(false);
          }}
          onMouseEnter={() => {
            setshowEntries(true);
          }}
        >
          <Image
            className="bar"
            src="/bar.png"
            width="32"
            height="32"
            onMouseOut={() => {
              setshowEntries(false);
            }}
            onMouseEnter={() => {
              setshowEntries(true);
            }}
          ></Image>
        </div>
        {showEntries && (
          <div className="entries">
            <Image src="/shape.png" width="272" height="176" alt=""></Image>
            <Typography className="entries_text">
              Among the whole list, there were 7 entries of @grahamjcaldwell
              user.
            </Typography>
          </div>
        )}
      </Box>
   
    </div>
  );
};

export default WinnerOne;
