import React from "react";
import { Box, Container, Paper } from "@mui/material";
import WinnerOne from "@/components/winners/WinnerOne";
import Navbar from "@/components/customInputs/AppBar";
import { useState, useEffect } from "react";
import Footer from "@/components/home/Footer";
import WinnersHeading from "@/components/home/WinnersHeading";

const Winner = () => {
  const [commentsArray, setCommentsArray] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
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
            <WinnersHeading commentsArray={commentsArray} />
            <WinnerOne
              commentsArray={commentsArray}
              setCommentsArray={setCommentsArray}
            />
          </Box>
          <Footer redirectLink={{ pathname: '/twitter/giveaway', query: { tab: 1 } }} />
        </Box>
      </Container>
    </>
  );
};

export default Winner;

