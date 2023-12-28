import React from "react";
import { Typography } from "@mui/material";

const WinnersHeading= ({commentsArray}) => {
 
  return (
    <>
      
      {commentsArray === null || commentsArray === "undefined" || commentsArray.length === 0
              ? <Typography className="no_winner_subheading">Disclaimer: There is no winner for a Giveaway.</Typography>
              : <>   {commentsArray !== null && (
                <Typography className="winner_heading">
                  {commentsArray.length === 1 ? "And the WINNER is" : "And the WINNERS are"}
                </Typography>
              )}
                  <Typography className="winner_subheading">Congrats! Your
               {commentsArray.length === 1 ? " winner has been " : " winners have been "}
                 picked!</Typography> </>}


    </>
  );
};

export default WinnersHeading;
