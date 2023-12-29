import { Typography, Container, Grid } from "@mui/material";
import Link from 'next/link';
import React from "react";
const CommentPicker = () => {
  return (
    <Container className="cp_container" maxWidth="90vw" sx={{ paddingBottom: '20px' }}>
      {/* Default content (for large screens) */}
      <div className="d-sm-none">
        <Typography className="commentPicker">
          Choose a Platform
        </Typography>
      </div>

      {/* Conditional rendering for smaller screens */}
      <div className="d-md-none"> 
        <Typography className="commentPicker">
          Start by Choosing a Platform
        </Typography>
      </div>
      <Grid sx={{
        display: 'flex',
        cursor: 'pointer',
        justifyContent: 'center',
        gap: '24px', 
        '@media (max-width: 768px)': {
          gap: '13px', 
        }
      }} container>
        <Grid className="logo_box_main" item xl={2} lg={2} md={3} xs={5}>

          <div id='instalogo' className="logo_box" >
            <Link href='/instagram/giveaway'    >
            <img className="logo_img" src="/ig.png" alt="logos" />
            </Link>
          </div>
        </Grid>
        <Grid className="logo_box_main" style={{ cursor: "pointer" }} item xl={2} lg={2} md={3} xs={5}>
          <div id='fblogo' className="logo_box" >
            <Link href='/facebook/giveaway'>
            <img className="logo_img" src="/fb.png" alt="logos" />
            </Link>
          </div>
        </Grid>
        <Grid className="logo_box_main" style={{ cursor: "pointer" }} item xl={2} lg={2} md={3} xs={5}>
          <div id="twitterlogo" className="logo_box" >
            <Link href='/twitter/giveaway'>
            <img className="logo_img" src="/twitter.png" alt="logos" />
            </Link>
          </div>
        </Grid>
        <Grid className="logo_box_main" style={{ cursor: "pointer" }} item xl={2} lg={2} md={3} xs={5}>
          <div id="ytlogo" className="logo_box" >
            <Link href='/youtube/giveaway'>
            <img className="logo_img" src="/yt.png" alt="logos" />
            </Link>
          </div>
        </Grid>
        <Grid className="logo_box_main" style={{ cursor: "pointer" }} sx={{ display: { xs: 'flex', md: "block", justifyContent: "center" } }} item xl={2} lg={2} md={3} xs={5}>
          <div id="tiktoklogo" className="logo_box" >
            <Link href='/tiktok/giveaway'>
            <img className="logo_img" src="/tiktok.png" alt="logos" />
            </Link>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CommentPicker;
