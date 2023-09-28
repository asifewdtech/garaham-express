import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";
import WinnerOne from "@/components/Winners/WinnerOne";
import Navbar from "@/components/AppBar/AppBar";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

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

  const serializedData = router.query.data || null;

  const handleCopyIframeCode = () => {
    if(typeof window !== "undefined") {
      const iframeCode = generateIframeCode(
        `http://localhost:3000/facebook/winners?data=/${serializedData}`
      );
      copyToClipboard(iframeCode);
      alert("copied to clipboard!");
    }
  };

  const generateIframeCode = (url) => {
    return `<iframe src="${url}" width="600" height="400" frameborder="0" allowfullscreen></iframe>`;
  };

  const copyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  };

  useEffect(() => {

    // Check if the code is running on the client-side
    if (typeof window !== "undefined") {
      // Code here that relies on the window object
      // Function to add class to body when inside an iframe
      if (window.self !== window.top) {
        document.body.classList.add("inside-iframe");
      }
    }
    
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth sx={{ pb: "15px" }}>
        <Box className="winner_container">
          <Box className="winner">
         
            <Typography className="winner_subheading" >
            </Typography>
           
  {commentsArray !== null && commentsArray.length === 0
    ?<Typography  sx={{height:'500px'}} className="no_winner_subheading"> No winner available to be selected.</Typography>
    : <>   <Typography className="winner_heading">
    And the WINNER is
  </Typography>  <Typography className="winner_subheading">Congrats! Your winner has been picked!</Typography> </>}


            <WinnerOne
              commentsArray={commentsArray}
              setCommentsArray={setCommentsArray}
            />
          </Box>
          <Box className="footer1">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              href="/">
              <Typography
                style={{ cursor: "pointer" }}
                className="new_contest active"
              >
                Start a New Contest{" "}
              </Typography>
            </Link>
            <div 
              style={{
                  cursor: "pointer",
                }} 
                onClick={handleCopyIframeCode}
                className="share"
            >
              <Typography>Share the results</Typography>
              <div className="svg-container"></div>
              <div className="share_link">
                <Link href="#">https://viralkit.io/</Link>
              </div>
              <div
                style={{
                  paddingLeft: "15px",
                  paddingTop: "10px",
                  cursor: "pointer",
                }}
              >
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
                href={{
                  pathname: "/facebook/giveaway",
                  query: { tab: 2 },
                }}
              >
                <Typography 
                  style={{ cursor: "pointer" }}
                  className="new_winner"
                >
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
