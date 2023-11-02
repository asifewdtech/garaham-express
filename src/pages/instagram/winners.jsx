import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";
import WinnerOne from "@/components/Winners/WinnerOne";
import Navbar from "@/components/AppBar/AppBar";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";

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
    console.log(serializedData)
    if(typeof window !== "undefined") {
      const iframeCode = generateIframeCode(
        `http://localhost:3000/instagram/winners?data=/${serializedData}`
      );
      copyToClipboard(iframeCode);
      alert("copied to clipboard!");
    }
  };

  const generateIframeCode = (url) => {
    return `<iframe src="${url}" width="600" height="400" frameborder="0" allowfullscreen></iframe>`;
  };

  const copyToClipboard = (text) => {
    console.log(text);
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
              ? <Typography className="no_winner_subheading">Disclaimer: There is no winner for a Giveaway.</Typography>
              : <>   {commentsArray !== null && (
                <Typography className="winner_heading">
                  {commentsArray.length === 1 ? "And the WINNER is" : "And the WINNERS are"}
                </Typography>
              )}
               <Typography className="winner_subheading">Congrats! Your winner has been picked!</Typography> </>}


            <WinnerOne
              commentsArray={commentsArray}
              setCommentsArray={setCommentsArray}
            /> 
          </Box>
         <Footer iframe={handleCopyIframeCode} redirectLink={ {pathname: '/instagram/giveaway', query: { tab: 1 }}}/>
        </Box>
      </Container>
    </>
  );
};

export default Winner;
