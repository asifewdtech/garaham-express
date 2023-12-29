import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Typography, Box, Container, Button } from "@mui/material";
import MySwitch from "../customInputs/Switch";
import axios from "axios";
import axiosInstance from "../utils/Utils";
const TwitterConditions = ({
  decrement,
  increment,
  setContestData,
  postId,
  contestData,
  setCommentData,
}) => {
  const [avatarSwitch, setAvatarSwitch] = useState(false);
  const [descriptionSwitch, setDescriptionSwitch] = useState(false);
  const [locationSwitch, setLocationSwitch] = useState(false);
  const [tweetId, setTweetId] = useState(localStorage.getItem("tweet_id"));

  useEffect(() => {
    const storedTweetId = localStorage.getItem("tweet_id");
    if (storedTweetId) {
      setTweetId(storedTweetId);
    }
  }, []);
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: contestData.conditions,
  });
  useEffect(() => {
    setAvatarSwitch(contestData.conditions.avatarSwitch || false);
    setDescriptionSwitch(contestData.conditions.descriptionSwitch || false);
    setLocationSwitch(contestData.conditions.locationSwitch || false);
  }, []);

  const onSubmit = async (data, e) => {
    const dataToSend = {
      ...data,
      avatarSwitch,
      descriptionSwitch,
      locationSwitch,
    };
    data
      ? localStorage.setItem("selectedConditions", JSON.stringify(dataToSend))
      : "";
    setContestData((prev) => ({ ...prev, conditions: dataToSend }));
    increment(e);
    const formData = new FormData();
    formData.append("title", data.title ? data.title : "");
    formData.append("winners", data.winners ? data.winners : "");
    formData.append("badwords", data.badwords ? data.badwords : "");
    formData.append("tweet_count", data.tweetCount ? data.tweetCount : "");
    formData.append("profile_age", data.Profile_Age ? data.Profile_Age : "");
    formData.append("avatar", avatarSwitch);
    formData.append("description", descriptionSwitch);
    formData.append("location", locationSwitch);
    formData.append("location", locationSwitch);
    formData.append(
      "tweet_id",
      data.tweet_id ? data.tweet_id : localStorage.getItem("tweet_id")
    );
    formData.append(
      "twitter_filter",
      data.twitter_filter ? data.twitter_filter : ""
    );
    try {
      const response = await axiosInstance.post(
        "",
        formData
      );
      if (response?.data.success) {
        const modifiedData = response.data.data.map((item) => {
          return {
            id: item.id,
            tweet_id: item.tweet_id,
            from_name: item.username,
            location: item.location,
            name: item.name,
            message: item.description,
            profilepic: item.profile_image_url,
            created_at: item.created_at,
            tweeter_id: item.tweeter_id,
            followers_count: item.followers_count,
            following_count: item.following_count,
            tweet_count: item.tweet_count,
            listed_count: item.listed_count,
            age: item.age,
          };
        });

        setCommentData(modifiedData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  let winners = watch("winners", 1);

  const winnerIncrement = () => {
    const newValue = +winners + 1;
    setValue("winners", newValue);
  };

  const winnerDecrement = () => {
    const newValue = +winners - 1;
    newValue >= 0
      ? setValue("winners", newValue)
      : setValue("winners", winners);
  };

  return (
    <div className="p_sm">
      <Typography className="CP_heading">
        {" "}
        Select the conditions you want to apply on your giveaway
      </Typography>
      <Typography className="CP_sub_heading bold_sm_headings">
        Basic Conditions
      </Typography>

      {/* <-------------------FORM ---------------> */}
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="text_inputs">
          <div>
            <legend className="legend">Giveaway Title</legend>
            <input
              className="input_field"
              {...register("title")}
              name="title"
              placeholder="New Year Giveaway"
            />
          </div>
          <div>
            <legend className="legend">Number of winners</legend>
            <div className="custom-number-input">
              <input
                defaultValue={1}
                className="input_field"
                type="number"
                required
                placeholder="0"
                name="winners"
                {...register("winners", { defaultValue: 1 })}
              />
              <div className="custom-number-input-arrows">
                <div className="arrow up" onClick={winnerIncrement}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M7.41422 4.25239C7.30493 4.14375 7.15708 4.08276 7.00297 4.08276C6.84886 4.08276 6.70102 4.14375 6.59172 4.25239L1.92505 8.91906C1.82949 9.03065 1.77955 9.1742 1.78522 9.32101C1.79089 9.46782 1.85175 9.60708 1.95564 9.71097C2.05953 9.81486 2.1988 9.87572 2.34561 9.88139C2.49242 9.88706 2.63596 9.83712 2.74755 9.74156L7.00005 5.48906L11.2526 9.74739C11.3624 9.85724 11.5114 9.91895 11.6667 9.91895C11.8221 9.91895 11.971 9.85724 12.0809 9.74739C12.1907 9.63755 12.2524 9.48857 12.2524 9.33323C12.2524 9.17788 12.1907 9.0289 12.0809 8.91906L7.41422 4.25239Z"
                      fill="#5065A8"
                    />
                  </svg>
                </div>
                <div className="arrow down" onClick={winnerDecrement}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M7.41422 9.74761C7.30493 9.85625 7.15708 9.91724 7.00297 9.91724C6.84886 9.91724 6.70102 9.85625 6.59172 9.74761L1.92505 5.08094C1.82949 4.96935 1.77955 4.8258 1.78522 4.67899C1.79089 4.53218 1.85175 4.39292 1.95564 4.28903C2.05953 4.18514 2.1988 4.12428 2.34561 4.11861C2.49242 4.11294 2.63596 4.16288 2.74755 4.25844L7.00005 8.51094L11.2526 4.25261C11.3624 4.14276 11.5114 4.08105 11.6667 4.08105C11.8221 4.08105 11.971 4.14276 12.0809 4.25261C12.1907 4.36245 12.2524 4.51143 12.2524 4.66677C12.2524 4.82212 12.1907 4.9711 12.0809 5.08094L7.41422 9.74761Z"
                      fill="#5065A8"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div>
            <legend className="legend">Profile Age</legend>
            <input
              className="input_field"
              {...register("Profile_Age")}
              placeholder="Profile_Age"
              name="Profile_Age"
            />
          </div>
          <div>
            <legend className="legend">Tweet Count</legend>
            <input
              className="input_field"
              {...register("tweetCount")}
              placeholder="0"
              name="tweetCount"
            />
          </div>
        </div>

        <div>
          <Typography
            style={{ paddingBottom: 0, paddingLeft: 0 }}
            className="CP_sub_heading"
          >
            Basic Conditions
          </Typography>
          <div style={{ paddingLeft: 0 }} className="exclude switch">
            <MySwitch
              onChange={() => setAvatarSwitch(!avatarSwitch)}
              checked={avatarSwitch}
              inputProps={{ "aria-label": "controlled" }}
            />
            <Typography className="switch_text">Avatar</Typography>
          </div>
          <div style={{ paddingLeft: 0 }} className="exclude switch">
            <MySwitch
              onChange={() => setDescriptionSwitch(!descriptionSwitch)}
              checked={descriptionSwitch}
              inputProps={{ "aria-label": "controlled" }}
            />
            <Typography className="switch_text">Description</Typography>
          </div>
          <div style={{ paddingLeft: 0 }} className="exclude switch">
            <MySwitch
              onChange={() => setLocationSwitch(!locationSwitch)}
              checked={locationSwitch}
              inputProps={{ "aria-label": "controlled" }}
            />
            <Typography className="switch_text">Location</Typography>
          </div>
        </div>
        <div
          style={{ marginLeft: 0, marginTop: "25px" }}
          className="text_inputs"
        >
          <div>
            <legend className="legend">Censor Words</legend>
            <input
              className="input_field"
              {...register("badwords")}
              placeholder="Censor words"
              name="badwords"
            />
          </div>
        </div>

        <input
          type="hidden"
          name="tweet_id"
          value={tweetId}
          {...register("tweet_id", {
            defaultValue: tweetId,
          })}
        />

        <input
          type="hidden"
          name="twitter_filter"
          value="twitter_filter"
          {...register("twitter_filter", {
            defaultValue: "twitter_filter",
          })}
        />

        <Container maxWidth="xl" sx={{ marginLeft: "-12px" }}>
          <Box
            className="post_buttons"
            sx={{ display: { xs: "flex", justifyContent: "space-around" } }}
          >
            <Button
              disableTouchRipple
              variant="contained"
              className="go_back"
              onClick={decrement}
            >
              Go Back
            </Button>
            <Button
              disableTouchRipple
              type="submit"
              variant="contained"
              className="save_btn"
            >
              Save and Continue
            </Button>
          </Box>
        </Container>
      </form>
      {/* <-------------------FORM ---------------> */}
    </div>
  );
};

export default TwitterConditions;
