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
import { useState } from "react";
import Link from "next/link";

const SelectPostContent = ({
  decrement,
  increment,
  setContestData,
  posts,
  setPostId,
  commentData,
}) => {
  const [selectCard, setselectedCard] = useState(null);

  const handleSelectCard = (e, card, i) => {
    e.preventDefault();
    setselectedCard(i);
    setPostId(card.post_id);
    setContestData((prev) => ({
      ...prev,
      postText: card.message,
      img: card.media_url,
    }));
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
        <Box className="cards">
          {posts ? (
            posts?.map((card, i) => {
              return (
                <Card
                  key={i}
                  onClick={(e) => handleSelectCard(e, card, i)}
                  className={`post_card ${
                    selectCard === i ? "active_card" : ""
                  }`}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "50%",
                    }}
                  >
                    <CardContent sx={{ padding: 0 }}>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        className="post_text"
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
                    ></Box>
                    <Typography className="cmnts_count">
                      • &nbsp; {commentData ? commentData.data.length : 4}{" "}
                      comments &nbsp; •{" "}
                    </Typography>
                  </Box>
                  <CardMedia
                    component="img"
                    image={card.media_url}
                    alt="post image"
                    className="post_image"
                  />
                </Card>
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
                variant="contained"
                className="go_back"
                onClick={decrement}
              >
                Go Back
              </Button>
            </Link>
            <Link href="#">
              <Button
                variant="contained"
                className="save_btn"
                onClick={increment}
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
