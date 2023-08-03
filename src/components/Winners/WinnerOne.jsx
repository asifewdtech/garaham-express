import React, { useRef, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
const WinnerOne = ({ count }) => {
  const [showEntries, setshowEntries] = useState(false);
  const [direction, setdirection] = useState("entry_right");

  const handleHover = (e) => {
    setshowEntries(true);
    let margin_left = e.clientX + 290;
    console.log(margin_left < window.innerWidth);
    if (margin_left < window.innerWidth) {
      setdirection("entry_right");
    } else {

      setdirection("entry_left");
    }


  };
  return (
    <div className="main">
      <Typography className="winner_count">{count}</Typography>
      <div>
        <Box className="trophy_Container">
          <img className="trophy" src="/trophy.png" alt="trophy" />
          {/* <div id="rect"> */}
          <img className="rect_img" src="/rect.png" alt="name" />
          {/* </div> */}

          <Typography className="name">Graham Caldwell</Typography>
        </Box>
      </div>

      <Box className="winner_comment">
        <img
          src="/winner.png"
          alt="winner"
          className="winner_img"
        />
        <div className="samll_screen_name" style={{display:"flex", alignItems: "center"}}>
          <Typography className="cmnt_name" element="p" id="name">
            Graham Caldwell
          </Typography>
          <Typography id="cmnt">Test Comment 🎈🎊🎉</Typography>
        </div>
        <div
          id="ellipse"
          onMouseEnter={(event) => handleHover(event)}
          onMouseLeave={() => setshowEntries(false)}
        >
          <Image className="bar" alt="bart" src="/bar.png" width="32" height="32"></Image>
          {showEntries && (
            <div
              id="entry"
              className={` ${direction}`}
            >
              <Image
                className={`${direction == 'entry_right' ? "" : 'reversed_img'} `}

                src="/shape.png"
                width="272"
                height="176"
                alt="message"
              ></Image>
              <Typography className={`${direction == 'entry_right' ? "" : 'reversed_text'} entries_text`}>
                Among the whole list, there were 7 entries of @grahamjcaldwell
                user.
              </Typography>
            </div>
          )}
        </div>
      </Box>
    </div>
  );
};

export default WinnerOne;
