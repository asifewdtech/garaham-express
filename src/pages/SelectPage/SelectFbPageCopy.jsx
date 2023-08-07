import { Box, Button, Typography, Container } from "@mui/material";
import React from "react";
import Navbar from "@/components/AppBar/AppBar";
import Header from "@/components/Header/Header";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import SelectPageContent from "@/components/SelectPage/SelectPageContent";
import SelectPostContent from "@/components/SelectPost/SelectPostContent";
import ChooseOptionContent from "@/components/ChooseOptions/ChooseOptionContent";
import PickWinner from "@/components/PickWinner/PickWinner";

const SelectFbPageCopy = () => {
  const [selectTab, setselectedTab] = useState("Select a page");
  const [currentTabIndex, setcurrentTabIndex] = useState(0)
  
const arrayOfComponents = [SelectPageContent, SelectPostContent, ChooseOptionContent, PickWinner];
const decrement=(e)=>{
  e.preventDefault()
 currentTabIndex!==0? setcurrentTabIndex(currentTabIndex-1): null

}
const increment=(e)=>{
  e.preventDefault()
 currentTabIndex!==arrayOfComponents.length? setcurrentTabIndex(currentTabIndex+1): null

}


  // BUTTONS
  const selectButtons = [
    "Select a page",
    "Select a post",
    "Choose options",
    "Pick a winner",
  ];

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const handleSelect = (e, i) => {
    e.preventDefault();
    const tab = e.target.dataset.tab;
    setselectedTab(tab);
  setcurrentTabIndex(i)
  };
  return (
    <>
      <Navbar />
      {/* <Header /> */}
      <Container className="SP_container" maxWidth="xl">
        <Box className="">
          <Grid container spacing={2} className="select-button-container">
            {selectButtons.map((item, i) => {
              return (
                <Grid item xs={3} key={i}>
                  <Item
                  disabled={i>currentTabIndex}
                    onClick={(e)=>handleSelect(e, i)}
                    data-tab={item}
                    className={`list_items ${
                      currentTabIndex === i ? "active_li" : null
                    }`}
                  ><span className="button_list_number"> {`${i + 1}.`}</span> {`${item}`}</Item>
                </Grid>
              );
            })}
          </Grid>
          <div className="content_div">
            <div className="CP_inner_container">

            
      {arrayOfComponents.map((Component, index) => (
        index === currentTabIndex ? <Component decrement={decrement} increment={increment} key={index} /> : null
      ))}
    
    
          {/* 
              {selectTab === "Select a page" && <SelectPageContent />}
              {selectTab === "Select a post" && <SelectPostContent />}
              {selectTab === "Choose options" && <ChooseOptionContent />}
              {selectTab === "Pick a winner" && <PickWinner />} */}
            </div>

             <div className="side_container">
              <div className="image_container">
                <Image
                  width="115"
                  height="115"
                  alt="fblogo"
                  src="/fbround.png"
                />
              </div>
              <div className="side_text">
                <Typography className="contest">Facebook Contest</Typography>
                <div className="page">
                  <Typography sx={{ pb: "10px", fontFamily: "Catamaran" }}>
                    Page
                  </Typography>
                  <Typography className="fb-box-condition">
                    Test Page
                  </Typography>
                </div>
              </div> 
             </div>
          </div>
        </Box>
      </Container>
      {/* <div className="side_container">
      <div className="image_container">
        <Image width="115" height="115" alt="fblogo" src="/fbround.png" />
      </div>
      <div className="side_text">
        <Typography className="contest">Facebook Contest</Typography>
        <div className="page">
          <Typography sx={{ pb: "10px", fontFamily: "Rubik" }}>Page</Typography>
          <Typography className="fb-box-condition">Test Page</Typography>
        </div>
      </div>
    </div> */}
    </>
  );
};

export default SelectFbPageCopy;
