import Navbar from '@/components/AppBar/AppBar'
import Header from '@/components/Header/Header';
import { Box, Typography, Card, CardMedia, CardContent, Container, Button } from '@mui/material'
import Image from "next/image";
import React from 'react'
import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';

const SelectPost = () => {
  const [selectTab, setselectedTab] = useState("select-post");
  const [selectCard, setselectedCard] = useState(null);
  const [activeCard, setActiceCard] = useState(null);

  const cardContent = [
    {
      content: "Three months ago I started this project with the idea to create a community for vegans, plant based eaters, vegetarians and veg-curious people. A website that will answer all your questions and you will be able to find ...",
      image: "/postImg.png"
    },
    {
      content: "Three months ago I started this project with the idea to create a community for vegans, plant based eaters, vegetarians and veg-curious people. A website that will answer all your questions and you will be able to find ...",
      image: "/postImg.png"
    },
    {
      content: "Three months ago I started this project with the idea to create a community for vegans, plant based eaters, vegetarians and veg-curious people. A website that will answer all your questions and you will be able to find ...",
      image: "/postImg.png"
    },
    {
      content: "Three months ago I started this project with the idea to create a community for vegans, plant based eaters, vegetarians and veg-curious people. A website that will answer all your questions and you will be able to find ...",
      image: "/postImg.png"
    },
    {
      content: "Three months ago I started this project with the idea to create a community for vegans, plant based eaters, vegetarians and veg-curious people. A website that will answer all your questions and you will be able to find ...",
      image: "/postImg.png"
    },
    {
      content: "Three months ago I started this project with the idea to create a community for vegans, plant based eaters, vegetarians and veg-curious people. A website that will answer all your questions and you will be able to find ...",
      image: "/postImg.png"
    },
    {
      content: "Three months ago I started this project with the idea to create a community for vegans, plant based eaters, vegetarians and veg-curious people. A website that will answer all your questions and you will be able to find ...",
      image: "/postImg.png"
    },
    {
      content: "Three months ago I started this project with the idea to create a community for vegans, plant based eaters, vegetarians and veg-curious people. A website that will answer all your questions and you will be able to find ...",
      image: "/postImg.png"
    },
    {
      content: "Three months ago I started this project with the idea to create a community for vegans, plant based eaters, vegetarians and veg-curious people. A website that will answer all your questions and you will be able to find ...",
      image: "/postImg.png"
    },
    {
      content: "Three months ago I started this project with the idea to create a community for vegans, plant based eaters, vegetarians and veg-curious people. A website that will answer all your questions and you will be able to find ...",
      image: "/postImg.png"
    },
    {
      content: "Three months ago I started this project with the idea to create a community for vegans, plant based eaters, vegetarians and veg-curious people. A website that will answer all your questions and you will be able to find ...",
      image: "/postImg.png"
    }
  ]

  const router = useRouter();

  const handleSelect = (e) => {
    e.preventDefault();
    const tab = e.target.dataset.tab;
    setselectedTab(tab);
    if(tab === "select-page"){
      router.push('http://localhost:3000/SelectPage/SelectFbPage')
    }else if(tab === "select-post"){
      router.push('http://localhost:3000/SelectPost/SelectPost')
    }
    else if(tab === "choose-options"){
      router.push('http://localhost:3000/SelectConditions/SelectConditions')
    }
    else if(tab === "pick-winner"){
      router.push('http://localhost:3000/ChooseWinner/ChooseWinner')
    }
  }

  const handleSelectCard = (index) => {
    // console.log(e.target)
    setselectedCard(index);
    // setActiceCard(selectCard === index);
  }
  return <>
    <Navbar />
    <Header />
    <Container maxWidth="xl" sx={{ marginTop: "55px" }}>
      <div>
        <ul style={{ paddingLeft: 0 }}>
          <li onClick={handleSelect} data-tab="select-page" className={`list_items ${selectTab === "select-page" ? "active_li" : null}`}>
            1. Select a page
          </li>
          <li onClick={handleSelect} className={`list_items ${selectTab === "select-post" ? "active_li" : null}`} data-tab="select-post">2. Select a post</li>
          <li onClick={handleSelect} className={`list_items ${selectTab === "choose-options" ? "active_li" : null}`} data-tab="choose-options">3. Choose options</li>
          <li onClick={handleSelect} className={`list_items ${selectTab === "pick-winner" ? "active_li" : null}`} data-tab="pick-winner">4. Pick a winner</li>
        </ul>
      </div>
    </Container>
    <Box className="select-post-box selectPost_container">
      <Typography className='select_heading'>
        Select the post that you would like to pick a winner from
      </Typography>
      <Typography className='select_subheading'>Choose your Facebook post by clicking on it.</Typography>
      <div style={{ paddingBottom: "30px" }}>
        <Box className='cards'>
          {cardContent.map((card, i) => {
            return <Card key={i} onClick={() => handleSelectCard(i)} className={`post_card ${selectCard === i ? "active_card" : ""}`}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography variant="subtitle1" color="text.secondary" component="div" className='post_text'>
                    {card.content}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

                </Box>
                <Typography className='cmnts_count'>•  4 comments  • </Typography>
              </Box>
              <CardMedia
                component="img"
                image={card.image}
                alt="post image"
              />
            </Card>
          })}
        </Box>
        <Container maxWidth='xl'>
          <Link href='/SelectConditions/SelectConditions'>
            <Button variant="contained" className="save_btn">Save and Continue</Button>
          </Link>
        </Container>
      </div>
    </Box>
    <div className="side_container">
      <div className="image_container">
        <Image width="115" height="115" alt="fblogo" src="/fbround.png" />
      </div>
      <div className="side_text">
        <Typography className="contest">Facebook Contest</Typography>
        <div className="page">
          <Typography sx={{pb: "10px", fontFamily: "Rubik"}}>Page</Typography>
          <Typography className="fb-box-condition">Test Page</Typography>
        </div>
        <div className="page">
          <Typography style={{fontFamily: "Rubik"}}>Post</Typography>

          <Card className='fb-card-box' sx={{ display: 'flex', alignItems: "center", maxWidth: "286px", maxHeight: "123px", marginTop: "15px" }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" className='fb-card-text'>
                  Three months ago I started this project with the idea to create a community for vegans...
                </Typography>
              </CardContent>
            </Box>
            <CardMedia
              sx={{ width: 100, height: 100 }}
              component="img"
              image="/postImg.png"
              alt="post image"
            />
          </Card>
        </div>
      </div>
    </div>
  </>
}

export default SelectPost
