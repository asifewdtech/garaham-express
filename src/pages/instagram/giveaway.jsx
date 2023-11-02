"use client";
import { Box, Typography, Container } from "@mui/material";
import React from "react";
import Navbar from "@/components/AppBar/AppBar";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import SelectInstaPost from "@/components/Instagram/SelectInstaPost";
import InstagramConditions from "@/components/Instagram/InstaConditions";
import PickWinner from "@/components/Instagram/PickWinner";
import { TwitterPost } from "@/components/Twitter/PickWinner";


// import {PickWinner} from "@/components/Twitter/PickWinner";


const TwitterGiveaway = () => {
  const router = useRouter();
  const [selectTab, setselectedTab] = useState("Select a page");
  const [currentTabIndex, setcurrentTabIndex] = useState(0);
  const [pages, setPages] = useState(null);
  const [posts, setPosts] = useState(null);
  const [postId, setPostId] = useState(null);
  const [commentData, setCommentData] = useState(null);
  const [visitedTabs, setVisitedTabs] = useState([0]);
  let myPages = [];
  const [contestData, setContestData] = useState({
    link: "",
   post:{},
    conditions: {},
  });

  const saveContestData = (e) => {
    // console.log(e.target.value)
  };

  // conditionally rendering the components
  useEffect(() => {
    const tabFromQuery = parseInt(router.query.tab, 10);
    // console.log(tabFromQuery)
    if (
      localStorage.getItem("postDetails") &&
      !isNaN(tabFromQuery) &&
      tabFromQuery === 1
    ) {
      setcurrentTabIndex(1);
    } else if (!isNaN(tabFromQuery) && tabFromQuery === 1) {
      setcurrentTabIndex(0);
    }
  }, [router.query.tab]);

  const arrayOfComponents = [
SelectInstaPost,
InstagramConditions,
PickWinner
  

  ];
  const decrement = (e) => {
    e.preventDefault();
    currentTabIndex !== 0 ? setcurrentTabIndex(currentTabIndex - 1) : null;
  };
  const increment = (e) => {
    e.preventDefault();
    if (currentTabIndex !== arrayOfComponents.length) {
      setcurrentTabIndex(currentTabIndex + 1);
      setVisitedTabs((prev) => [...prev, currentTabIndex + 1]);
    } 
  };

  // BUTTONS
  const selectButtons = [
    "Post Link",
    "Choose Conditions",
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
  function truncatePost(post) {
    const truncatedIdLength = 100;
    if (post.length <= truncatedIdLength) {
      return post;
    } else {
      return post.substring(0, truncatedIdLength) + "...";
    }
  }

  useEffect(() => {
    const fetchPages = async () => {
      const formData = new FormData();
      formData.append("user_id", "#41fd5994c08918b5889c82c05b2723aa");
      formData.append("resource", "facebook");

      try {
        const response = await axios.post(
          "http://localhost/viralyIO/api/includes/actions.php",
          formData
        );
        setPages(response?.data.pages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPages();
  }, []);

  for (const page in pages) {
    myPages.push({
      id: page,
      page: pages[page],
    });
  }

  useEffect(() => {
    const postLink = JSON.parse(localStorage.getItem("postLink"));
    const conditions = JSON.parse(localStorage.getItem("selectedConditions"));
   const postDetails=JSON.parse(localStorage.getItem("postDetails"));
    const updatedContestData = { ...contestData };

    if (postLink) {
      updatedContestData.link = postLink
    }

    if (postDetails) {
      updatedContestData.post = postDetails;
    }

    if (conditions) {
      updatedContestData.conditions = conditions;
    }
    setContestData(updatedContestData);
  }, []);

 

  useEffect(() => {
    window.addEventListener("beforeunload", function (event) {
      localStorage.clear();
    });
  }, []);

  return (
    <>
      <Navbar />
      <Container className="SP_container" maxWidth="xl">
        <Box className="">
        <SelectButtons
         visitedTabs={visitedTabs}
        contestData={contestData}
            selectButtons={selectButtons}
            currentTabIndex={currentTabIndex}
            handleSelect={handleSelect}
          />
          <div className="content_div">
            <div className="CP_inner_container">
              {arrayOfComponents.map((Component, index) =>
                index === currentTabIndex ? (
                  <Component
                    contestData={contestData}
                    setContestData={setContestData}
                    saveContestData={saveContestData}
                    decrement={decrement}
                    increment={increment}
                    key={index}
                    pages={myPages}
                    setPosts={setPosts}
                    posts={posts}
                    setPostId={setPostId}
                    postId={postId}
                    setCommentData={setCommentData}
                    commentData={commentData}
                  />
                ) : null
              )}
            </div>
{/* side cotainer starts  */}
<div  className=""></div>
            <div className="side_container  ">
              <div className="image_container">
                <Image
                  width="115"
                  height="115"
                  alt="fblogo"
                  src="/instaRound.png"
                />
              </div>
              <div className="side_text">
                <Typography  className="contest insta_text">Instagram Contest</Typography>
                <div className="page">
                  <Typography className="sideHeadings" sideHeadings sx={{ pb: "10px", fontFamily: "Catamaran" }}>
                   Link
                  </Typography>
                  <p style={{ lineBreak:"anywhere",  paddingBottom: "15px", whiteSpace: 'normal'   }} className="fb-box-condition">
                    {" "}
                    {contestData.link}
                    {/* Copy the URL of the Twitter post that you would like to pick a comment from and paste it in the field below */}
                  </p>
                  {/* <Typography className="sideHeadings"  sx={{ pb: "10px", fontFamily: "Catamaran" }}>
                    Post
                  </Typography> */}
                  {contestData.link?.length !== 0 ? (
                    <>  <Typography className="sideHeadings"  sx={{ pb: "10px", fontFamily: "Catamaran"  }}
                    >
                      Post
                    </Typography>
                    <div className="insta_sideImg_con">
                      
                    
                      <img
                        src="/postImg.png"
                        className="insta_sideImg"
                        alt="post-img"
                      />
                    </div></>
                  ) : (
                    ""
                  )}
                 
{contestData?.conditions.winners  && (
    <Typography className="sideHeadings" sx={{ pb: "10px", pt: "20px", fontFamily: "Catamaran" }}>
      Conditions
    </Typography>
  )}
                  <div className="conditions">
                   
        
                    {Object.entries(contestData?.conditions).map(
                      ([key, value]) => (
                        <>
                          <Typography
                            sx={{ pb: "5px" }}
                            className="fb-box-condition"
                            key={key}
                          >
                            {value !== "" ? value : ""}
                          </Typography></>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Container>
    </>
  );
};

export default TwitterGiveaway;
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const SelectButtons = ({ visitedTabs, contestData, selectButtons, currentTabIndex, handleSelect }) => {

  return (
    <Grid container className="select-button-container">
      {selectButtons.map((item, i) => {
        return (
          <Grid style={{ padding: 0 }} className="btn-grid" flex='0 0 auto' item xs={4} key={i}>
            <Item 
              as="button"
              disabled={ !(
                contestData.conditions.winners ||
                visitedTabs.includes(i)
              )}
              onClick={(e) => handleSelect(e, i)}
              data-tab={item}
              className={`list_btns list_items ${currentTabIndex === i ? "active_li" : null}`}
            >
              <span className="button_list_number">{`${i + 1}.`}</span> {`${item}`}
            </Item>
          </Grid>
        );
      })}
    </Grid>
  );
};
