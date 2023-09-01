import React from "react";
import { Box, Typography, Container, Paper, Grid, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";
import WinnerOne from "@/components/Winners/WinnerOne";
import Navbar from "@/components/AppBar/AppBar";
import { useRouter } from 'next/router';
import { useState , useEffect} from "react";

const Winner = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const [commentsArray, setCommentsArray] = useState(null);
  const router = useRouter();

  const serializedData = router.query.data;
  useEffect(() => {
    if(serializedData) {
      const arrayOfObjects = JSON.parse(decodeURIComponent(serializedData));
      setCommentsArray(arrayOfObjects);
      console.log(arrayOfObjects );
    }
  }, [])
  

  return (
    <>
      <Navbar />
      <Container maxWidth>
        <Box className="winner_container">
          <Box className="winner">
            <Typography className="winner_heading">
              And the WINNER is
            </Typography>
            <Typography className="winner_subheading">
              Congrats! Your winner has been picked!
            </Typography>
            <WinnerOne commentsArray = {commentsArray}/>
            {/* Winner list starts */}
          </Box>
          <Box className="footer1">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              href="/SelectPage/SelectFbPageCopy"
            >
              <Typography className="new_contest active">
                Start a New Contest{" "}
              </Typography>
            </Link>
            <div className="share">
              <Typography>Share the results</Typography>
              <div className="svg-container"></div>
              <div className="share_link">
                <Link href="#">https://viralkit.io/c</Link>
              </div>
              <div style={{paddingLeft: "15px", paddingTop: "10px"}}>
                <Image
                  src="/copy.png"
                  width="24"
                  height="24"
                  alt="copy"
                ></Image>
              </div>
            </div>
            <div className="pick">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                href="/SelectPage/SelectFbPageCopy"
              >
                <Typography className="new_winner">
                  Pick Another Winner
                </Typography>
              </Link>
            </div>
          </Box>
          {/* <Container maxWidth='xl'>
          <div className="share share_copy">
            <Typography>Share the results</Typography>
            <div className="svg-container"></div>
            <Link href="#" className="share_link">
              https://sweepwidg
            </Link>
            <div>
              <Image src="/copy.png" width='24' height='24' className="copy_box" alt="copy"></Image>
            </div>
          </div>
          <Box sx={{ display: { xs: 'flex', justifyContent: 'space-around', md: 'none' }, marginLeft: "30px" }}>
            <Link href='#'>
              <Button variant="contained" className="go_back">Go Back</Button>
            </Link>
            <Link href='/SelectConditions/SelectConditions'>
              <Button variant="contained" className="save_btn">Save and Continue</Button>
            </Link>
          </Box>
        </Container> */}
        </Box>
      </Container>
    </>
  );
};

export default Winner;
