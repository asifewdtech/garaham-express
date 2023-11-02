import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";

const SelectPostContent = ({
  contestData,
  decrement,
  increment,
  setContestData,
  posts,
  setPostId,
  commentData,
  setPosts,
}) => {
  const [selectCard, setselectedCard] = useState(null);

    useEffect(() => {

      const selectedPost = localStorage.getItem("selectedPost");
      const selectedCard = localStorage.getItem("selectedCard");
  
      if (selectedPost) {
        const { postText, img, id } = JSON.parse(selectedPost);
  
        setPostId(id);
        setContestData((prev) => ({ ...prev, postText, img }));
      }
  
      if (selectedCard) {
        setselectedCard(parseInt(selectedCard, 10));
      }

      const postId = localStorage.getItem("postId");
      if (postId) {
        setPostId(parseInt(postId, 10));
      }

    }, []);
  
    // Check if posts are available in localStorage, and use them if available
    useEffect(() => {

      const postsFromLocalStorage = localStorage.getItem("posts");
      if (postsFromLocalStorage) {
        const parsedPosts = JSON.parse(postsFromLocalStorage);
        setPosts(parsedPosts);
      }
      
    }, [setPosts]);

  const handleSelectCard = (e, card, i) => {
    e.preventDefault();
    setselectedCard(i);
    setPostId(card.post_id);
    setContestData((prev) => ({
      ...prev,
      postText: card.message,
      img: card.media_url,
    }));
    localStorage.setItem("postId", JSON.stringify(card.post_id));
    localStorage.setItem(
      "selectedPost",
      JSON.stringify({
        postText: card.message,
        img: card.media_url,
        id: card.post_id,
      })
    );
    localStorage.setItem("selectedCard", i.toString());
  };

  return (
    <>
      <Typography className="CP_heading">
        {" "}
        Select the post that you would like to pick a winner from
      </Typography>
      <Typography className="CP_sub_heading">
        Choose your Facebook post by clicking on it.
      </Typography>
      <div className="cards-main-box" style={{ paddingBottom: "30px" }}>
        <Box className="cards" style={{maxHeight: "430px", overflowY: "auto", padding:'20px'}}>
          {posts ? (
            posts?.map((card, i) => {
              return (
                <Card
  key={i}
  onClick={(e) => handleSelectCard(e, card, i)}
  className={`post_card ${selectCard === i ? "active_card" : ""}`}
  sx={{
    display: "flex",
    gap: "20px", // Add gap between columns
  }}
>
  <Box
    sx={{
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent:'space-between',
      width: "50%",
    }}
  >
    <CardContent sx={{ padding: 0 }}>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        component="div"
        className="post_text hide-scrollbar"
        // style={{maxHeight:'100px', lineBreak:'auto'}}
      >
        {card.message}
        </Typography>
    </CardContent>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        pl: 1,
        pb: 1,
      }}
    >
      {/* Additional content for the text column, if needed */}
    </Box>
    <Typography className="cmnts_count">
      • &nbsp; {commentData ? commentData.data.length : 4} comments &nbsp; •
    </Typography>
  </Box>
  <div
   
    className="fb_post_img"
  >
    <img
      src={card.media_url}
      alt="post image"
      className="post_image"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  </div>
</Card>

                // <Card
                //   key={i}
                //   onClick={(e) => handleSelectCard(e, card, i)}
                //   className={`post_card ${
                //     selectCard === i ? "active_card" : ""
                //   }`}
                // >
                //   <Box
                //     sx={{
                //       flexGrow:1,
                //       display: "flex",
                //       flexDirection: "column",
                //       width: "50%",
                //     }}
                //   >
                //     <CardContent sx={{ padding: 0 }}>
                //       <Typography
                //         variant="subtitle1"
                //         color="text.secondary"
                //         component="div"
                //         className="post_text"
                //       >
                //         {card.message}
                //       </Typography>
                //     </CardContent>
                //     <Box
                //       sx={{
                //         display: "flex",
                //         alignItems: "center",
                //         pl: 1,
                //         pb: 1,
                //       }}
                //     ></Box>
                //     <Typography className="cmnts_count">
                //       • &nbsp; {commentData ? commentData.data.length : 4}{" "}
                //       comments &nbsp; •{" "}
                //     </Typography>
                //   </Box>
                //   <CardMedia
                //     component="img"
                //     image={card.media_url}
                //     alt="post image"
                //     className="post_image"
                //   />
                // </Card>
              );
            })
          ) : (
            <CircularProgress />
          )}
        </Box>
        <Container maxWidth="xl">
          <Box
            className="post_buttons"
            sx={{ display: { xs: "flex", justifyContent: "space-around" } }}
          >
            <Link href="#">
              <Button
              disableTouchRipple 
                variant="contained"
                className="go_back"
                onClick={decrement}
              >
                Go Back
              </Button>
            </Link>
            <Link href="#">
              <Button
              disableTouchRipple 
                variant="contained"
                className="save_btn"
                onClick={increment}
                disabled={!contestData.postText}
              >
                Save and Continue
              </Button>
            </Link>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default SelectPostContent;
