import { Box, Button, Typography, Container, Card, CardMedia, CardContent, } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const SelectPostContent = ({decrement, increment}) => {

  // const [selectTab, setselectedTab] = useState("select-post");
  const [selectCard, setselectedCard] = useState(null);
  const [activeCard, setActiceCard] = useState(null);

  // CARD IMAGES

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
    }
    // {
    //   content: "Three months ago I started this project with the idea to create a community for vegans, plant based eaters, vegetarians and veg-curious people. A website that will answer all your questions and you will be able to find ...",
    //   image: "/postImg.png"
    // }
  ];

  const handleSelectCard = (index) => {
    // console.log(e.target)
    setselectedCard(index);
    // setActiceCard(selectCard === index);
  }

  return <>
    <Typography className="CP_heading">
      {" "}
      Select the post that you would like to pick a winner from
    </Typography>
    <Typography className="CP_sub_heading">
      Choose your Facebook post by clicking on it.
    </Typography>
    <div className="cards-main-box" style={{ paddingBottom: "30px" }}>
      <Box className='cards'>
        {cardContent.map((card, i) => {
          return <Card key={i} onClick={() => handleSelectCard(i)} className={`post_card ${selectCard === i ? "active_card" : ""}`}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: "50%" }}>
              <CardContent sx={{ padding: 0 }}>
                <Typography variant="subtitle1" color="text.secondary" component="div" className='post_text'>
                  {card.content}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

              </Box>
              <Typography className='cmnts_count'>• &nbsp;  4 comments &nbsp; • </Typography>
            </Box>
            <CardMedia
              component="img"
              image={card.image}
              alt="post image"
              className="post_image"
            />
          </Card>
        })}
      </Box>
        {/* <Box sx={{ display: { xs: 'flex', justifyContent: 'center' } }}>
          <Link href='#'>
            <Button variant="contained" className="save_btn">Load More Posts</Button>
          </Link>
        </Box> */}
      {/* <Container maxWidth='xl'>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Link href='/SelectConditions/SelectConditions'>
            <Button variant="contained" className="save_btn">Save and Continue</Button>
          </Link>
        </Box>
      </Container> */}
      <Container maxWidth='xl'>
        <Box className="post_buttons" sx={{ display: { xs: 'flex', justifyContent: 'space-around' } }}>
          <Link href='#'>
            <Button variant="contained" className="go_back" onClick={decrement}>Go Back</Button>
          </Link>
          <Link href='#'>
            <Button variant="contained" className="save_btn" onClick={increment} >Save and Continue</Button>
          </Link>
        </Box>
      </Container>
    </div>
  </>
}

export default SelectPostContent;