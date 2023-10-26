import { Typography, Container, Grid } from "@mui/material";
import Link from 'next/link';
import React from "react";


const CommentPicker = () => {
  return (
    <Container maxWidth="xl" sx={{paddingBottom: '20px'}}>
      <Typography className="commentPicker">
      Choose a Platform
      </Typography>
      <Grid style={{ display:'flex', gap:'20px', cursor: "pointer", justifyContent: "center" }} container>
        <Grid className="logo_box_main" item xl={2} lg={2} md={3}  xs={5}>
        
          <div className="logo_box">
          <Link href='/instagram/giveaway'>
              <img className="logo_img" src="/ig.png" alt="logos" />
            </Link>
          </div>
        </Grid>
        <Grid  className="logo_box_main" style={{ cursor: "pointer" }} item xl={2} lg={2} md={3}  xs={5}>
          <div className="logo_box">
            <Link href='/facebook/giveaway'>
              <img className="logo_img" src="/fb.png" alt="logos" />
            </Link>
          </div>
        </Grid>
        <Grid  className="logo_box_main" style={{ cursor: "pointer" }} item xl={2} lg={2} md={3} xs={5}>
          <div className="logo_box">
          <Link href='/twitter/giveaway'>
              <img className="logo_img" src="/twitter.png" alt="logos" />
            </Link>
          </div>
        </Grid>
        <Grid  className="logo_box_main" style={{ cursor: "pointer" }} item xl={2} lg={2} md={3}  xs={5}>
          <div className="logo_box">
          <Link href='/youtube/giveaway'>
              <img className="logo_img" src="/yt.png" alt="logos" />
            </Link>
          </div>
        </Grid>
        <Grid  className="logo_box_main" style={{ cursor: "pointer" }} sx={{display: {xs: 'flex', md: "block", justifyContent: "center"}}} item xl={2} lg={2} md={3}  xs={5}>
          <div className="logo_box">
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
