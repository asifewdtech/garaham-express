"use client";
import { Box, Typography, Container } from "@mui/material";
import React from "react";
import Navbar from "@/components/customInputs/AppBar";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import SelectTiktokPost from "@/components/tiktok/SelectTiktokPost";
import TiktokConditions from "@/components/tiktok/TiktokConditions";
import PickWinner, { TikTokSidePost } from "@/components/tiktok/PickWinner";
import axiosInstance from "@/components/utils/Utils";
import { SelectButtons } from "@/components/customInputs/SelectButton";
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
    postText: "",
    img: "",
    conditions: {},
  });

  // dynamic content for side container
  const saveContestData = (e) => {
    // console.log(e.target.value)
  };

  // conditionally rendering the components
  useEffect(() => {
    const tabFromQuery = parseInt(router.query.tab, 10);
    if (
      localStorage.getItem("pagecontent") &&
      !isNaN(tabFromQuery) &&
      tabFromQuery === 2
    ) {
      setcurrentTabIndex(tabFromQuery);
    } else if (!isNaN(tabFromQuery) && tabFromQuery === 2) {
      setcurrentTabIndex(0);
    }
  }, [router.query.tab]);

  const arrayOfComponents = [

    SelectTiktokPost,
    TiktokConditions,
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
        const response = await axiosInstance.post(
          "",
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
    const pagetext = JSON.parse(localStorage.getItem("pagecontent"));
    const posttext = JSON.parse(localStorage.getItem("selectedPost"));
    const conditions = JSON.parse(localStorage.getItem("selectedConditions"));
    const postId = JSON.parse(localStorage.getItem("postId"));
    if (postId) {
      if (typeof postId === "number") {
      
      } else {
        const parsedPostId = parseInt(postId, 10);
        if (!isNaN(parsedPostId)) {
          setPostId(postId);
        } else {
          console.log("postId is not a valid number");
        }
      }
    }

    const updatedContestData = { ...contestData };

    if (posttext) {
      updatedContestData.img = posttext.img;
      updatedContestData.postText = posttext.postText;
    }

    if (pagetext) {
      updatedContestData.page = pagetext;
    }

    if (conditions) {
      updatedContestData.conditions = conditions;
    }
    setContestData(updatedContestData);
  }, [posts]);



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
            <div className=""></div>
            <div className="side_container  ">
              <div className="image_container">
                <Image
                  width="115"
                  height="115"
                  alt="fblogo"
                  src="/tiktokrounded.png"
                />
              </div>
              <div className="side_text">
                <Typography className="contest tiktok_text">TikTok Giveaway</Typography>
                <div className="page">
                  <Typography className="side_headings" sx={{ pb: "10px", fontFamily: "Catamaran" }}>
                    Link
                  </Typography>
                  <p style={{ lineBreak: "anywhere", paddingBottom: "15px", whiteSpace: 'normal' }} className="fb-box-condition">
                    {" "}
                    {contestData.link}
                    {/* Copy the URL of the Twitter post that you would like to pick a comment from and paste it in the field below */}
                  </p>

                  {contestData.link?.length !== 0 ? (
                    <><Typography className="side_headingss" sx={{ pb: "10px", fontFamily: "Catamaran" }}>
                      Post
                    </Typography><TikTokSidePost /></>
                  ) : (
                    ""
                  )}

                  {contestData?.conditions.winners && (
                    <Typography className="side_headings" sx={{ pb: "10px", pt: "20px", fontFamily: "Catamaran" }}>
                      Conditions
                    </Typography>
                  )}
                  <div className="conditions">
                    {Object.entries(contestData?.conditions).map(
                      ([key, value]) => (
                        <Typography
                          sx={{ pb: "5px" }}
                          className="fb-box-condition"
                          key={key}
                        >
                          {value !== "" ? value : ""}
                        </Typography>
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
