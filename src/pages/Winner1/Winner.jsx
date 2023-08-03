import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
const Winner = () => {
  return (
    <Box className="winner_container">
      <Box className="winner">
        <Typography className="winner_heading">And the WINNER is</Typography>
        <Typography className="winner_subheading">
          Congrats! Your winner has been picked!
        </Typography>
        <Box className="trophy_Container">
          <Image
            className="trophy"
            src="/trophy.png"
            width="147"
            height="165"
            alt="trophy"
          ></Image>
          <div id="rect">
            {" "}
            <Image src="/rect.png" width="507" height="118" alt="name"></Image>
          </div>
          <Typography className="name">Graham Caldwell</Typography>
        </Box>
      </Box>

      <Box className="winner_comment">
        <Image src="/winner.png" width="90" height="90" alt="winner"></Image>
        <Typography element="p" id="name">
          Graham Caldwell
        </Typography>
        <Typography id="cmnt">Test Comment 🎈🎊🎉</Typography>
        <div id="ellipse">
          <Image className="bar" src="/bar.png" width="32" height="32"></Image>
        </div>
        <div className="entries">
          <Image src="/shape.png" width="272" height="176" alt=""></Image>
          <Typography className="entries_text">
            Among the whole list, there were 7 entries of @grahamjcaldwell user.
          </Typography>
        </div>
      </Box>
        <Box className='footer'>
           <Typography className="new_contest active">Start a New Contest </Typography>
            <div className="share">
                <Typography>Share the results</Typography>
                <div className="svg-container"></div>
                <Link href='/' className="share_link">https://sweepwidg</Link>
                <div><Image src='/copy.png' width='24' height='24' alt='copy'></Image></div>
              
            </div>
            <div>
            <Typography className="new_winner">Pick Another Winner</Typography>
            </div>
        </Box>


    </Box>
  );
};

export default Winner;
