import { Box, Typography, Container } from "@mui/material";
import React from "react";
import Navbar from "@/components/AppBar/AppBar";
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
  const [currentTabIndex, setcurrentTabIndex] = useState(0);
  const [contestData, setContestData] = useState({
    page: "",
    postText: "",
    img: "",
    conditions: {},
  });
  console.log(contestData.conditions);
  // dynamic content for side container
  const saveContestData = (e) => {
    console.log(e.target.name);
    // console.log(e.target.value)
  };

  // conditionally rendering the components
  const arrayOfComponents = [
    SelectPageContent,
    SelectPostContent,
    ChooseOptionContent,
    PickWinner,
  ];
  const decrement = (e) => {
    e.preventDefault();
    currentTabIndex !== 0 ? setcurrentTabIndex(currentTabIndex - 1) : null;
  };
  const increment = (e) => {
    e.preventDefault();
    currentTabIndex !== arrayOfComponents.length
      ? setcurrentTabIndex(currentTabIndex + 1)
      : null;
  };

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
    setcurrentTabIndex(i);
  };
  return (
    <>
      <Navbar />
      <Container className="SP_container" maxWidth="xl">
        <Box className="">
          <Grid container spacing={2} className="select-button-container">
            {selectButtons.map((item, i) => {
              return (
                <Grid item xs={3} key={i}>
                  <Item
                    disabled={i > currentTabIndex}
                    onClick={(e) => handleSelect(e, i)}
                    data-tab={item}
                    className={`list_items ${
                      currentTabIndex === i ? "active_li" : null
                    }`}
                  >
                    <span className="button_list_number"> {`${i + 1}.`}</span>{" "}
                    {`${item}`}
                  </Item>
                </Grid>
              );
            })}
          </Grid>
          <div className="content_div">
            <div className="CP_inner_container">
              {arrayOfComponents.map((Component, index) =>
                index === currentTabIndex ? (
                  <Component
                    setContestData={setContestData}
                    saveContestData={saveContestData}
                    decrement={decrement}
                    increment={increment}
                    key={index}
                  />
                ) : null
              )}
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
                  <Typography sx={{ pb: "15px" }} className="fb-box-condition">
                    {contestData.page}
                  </Typography>
                  <Typography sx={{ pb: "10px", fontFamily: "Catamaran" }}>
                    Post
                  </Typography>
                  {contestData.postText?.length !==0 ?  <div className="side_card_box">
                    <Typography className="sideboxcardtext">
                      {contestData.postText}
                    </Typography>
                    <img
                      src={contestData.img}
                      className="sideboximg"
                      alt="post-img"
                    />
                  </div> :''}

                 
                  <Typography
                    sx={{ pb: "10px", pt: "20px", fontFamily: "Catamaran" }}
                  >
                    Conditions
                  </Typography>

                  {Object.entries(contestData?.conditions).map(([key, value]) => (
                    <Typography
                      sx={{ pb: "5px" }}
                      className="fb-box-condition"
                      key={key}
                    >
                       { value !==  '' ?value : ""}

                    </Typography>
                  ))}

                  {/* <Typography sx={{pb: '5px'}} className="fb-box-condition">
                    New Year Giveaway
                  </Typography>
                  <Typography sx={{pb: '5px'}} className="fb-box-condition">
                    2 Winners
                  </Typography>
                  <Typography sx={{pb: '5px'}} className="fb-box-condition">
                    Minimum 3 posts
                  </Typography>
                  <Typography sx={{pb: '5px'}} className="fb-box-condition">
                    Minimum 3 tags
                  </Typography> */}
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Container>
    </>
  );
};

export default SelectFbPageCopy;
