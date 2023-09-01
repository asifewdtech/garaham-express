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
      <Container maxWidth sx={{pb: "15px"}}>
        <Box className="winner_container">
          <Box className="winner">
            <Typography className="winner_heading">
              And the WINNER is
            </Typography>
            <Typography className="winner_subheading">
              {commentsArray ? "Congrats! Your winner has been picked!" : "No Comments here"}
            </Typography>
            <WinnerOne commentsArray = {commentsArray}/>
          </Box>
          <Box className="footer1">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              href="/facebook/giveaway"
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
                href="/facebook/giveaway"
              >
                <Typography className="new_winner">
                  Pick Another Winner
                </Typography>
              </Link>
            </div>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Winner;
