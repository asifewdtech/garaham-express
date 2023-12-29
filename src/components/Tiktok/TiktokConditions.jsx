import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Typography, Box, Container, Button } from "@mui/material";
import MySwitch from "../customInputs/Switch";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import styled from "@emotion/styled";
import axiosInstance from "../utils/Utils";

const TiktokConditions = ({
  decrement,
  increment,
  setContestData,
  postId,
  contestData,
  setCommentData,
}) => {
  const [isUniqueUsersChecked, setIsUniqueUsersChecked] = useState(false);
  const [isDuplicatesChecked, setIsDuplicatesChecked] = useState(false);
  const [isRepliesChecked, setIsRepliesChecked] = useState(false);
  const [isBanAbusiveChecked, setIsBanAbusiveChecked] = useState(false);
  
  const [logoFile, setLogoFile] = useState(null);
  const [isChecked, setIsChecked] = useState("");
  // const [value, setValue] = useState(0)

  const label = { inputProps: { "aria-label": "Color switch demo" } };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: contestData.conditions });

  const onSubmit = async (data, e) => {
    data
      ? localStorage.setItem("selectedConditions", JSON.stringify(data))
      : "";
    const dataToSend = { ...data };
    setContestData((prev) => ({ ...prev, conditions: dataToSend }));

    increment(e);

    const formData = new FormData();

    formData.append("title", data.title ? data.title : "");
    formData.append("winners", data.winners ? data.winners : "");
    formData.append("badwords", data.badwords ? data.badwords : "");
    formData.append("words", data.words ? data.words : "");
    formData.append("phrases", data.phrases ? data.phrases : "");
    formData.append("blocks", data.blocks ? data.blocks : "");
    formData.append("uniqueusers", isUniqueUsersChecked );
    formData.append("duplicates", isDuplicatesChecked );
    formData.append("include_replies", isRepliesChecked );
    formData.append("ban_abusive_comments", isBanAbusiveChecked );

    formData.append(
      "fb_insta_filter",
      data.fb_insta_filter ? data.fb_insta_filter : ""
    );

    formData.append("profilepic", logoFile?.name ? logoFile.name : "");
    formData.append("resource", "facebook");

    formData.append("post_id", postId);

    try {
      const response = await axiosInstance.post(
        "",
        formData
      );
      if (response?.data.success) {
        setCommentData(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  let winners = watch("winners", 1);
  let postCount = watch("postCount", 0);
  let followers = watch("followers", 0);

  const postIncrement = () => {
    const newValue = +postCount + 1;

    setValue("postCount", newValue);
  };

  const postDecrement = () => {
    const newValue = +postCount - 1;
    newValue >= 0
      ? setValue("postCount", newValue)
      : setValue("postCount", postCount);
  };

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

  const followersIncrement = () => {
    const newValue = +followers + 1;
    setValue("followers", newValue);
  };

  const followersDecrement = () => {
    const newValue = +followers - 1;
    newValue >= 0
      ? setValue("followers", newValue)
      : setValue("followers", followers);
  };

  const ispositive = (num) => {
    num >= 0 ? num - 1 : 0;
  };

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="p_sm" >
      <Typography className="CP_heading">
        {" "}
        Select the conditions you want to apply on your giveaway
      </Typography>
      <Typography className="CP_sub_heading">Basic Conditions</Typography>
      {/* FORM */}
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
            <legend className="legend">Must include Phrases</legend>
            <input
              className="input_field"
              {...register("phrases")}
              placeholder="phrases"
              name="phrases"
            />
          </div>
          <div>
            <legend className="legend">Keyword</legend>
            <input
              className="input_field"
              {...register("words")}
              placeholder="words"
              name="words"
            />
          </div>
          <div>
          </div>

        </div>




        <Typography className="CP_sub_heading yt_filter">Filters</Typography>
        <div className="text_inputs" id="yt_switches">


          <>
            <div className="exclude yt_switches switch">
              <MySwitch
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
              <Typography className="switch_text">Get Unique Users</Typography>
            </div>
            <div  style={{}} className="exclude yt_switches switch">
              <MySwitch inputProps={{ "aria-label": "controlled" }} />
              <Typography className="switch_text">
                Duplicate comments
              </Typography>
            </div>
            <div style={{}} className="exclude yt_switches switch">
              <MySwitch inputProps={{ "aria-label": "controlled" }} />
              <Typography className="switch_text">
                Include replies
              </Typography>
            </div>
            <div style={{}} className="exclude yt_switches switch">
              <MySwitch inputProps={{ "aria-label": "controlled" }} />
              <Typography className="switch_text">
                Ban abusive comments
              </Typography>
            </div>

            <input
              type="hidden"
              name="fb_insta_filter"
              value="fb_insta_filter"
              {...register("fb_insta_filter", {
                defaultValue: "fb_insta_filter",
              })}
            />

          </>

        </div>
        <div style={{marginTop:'20px'}} className="text_inputs">
          <div>
            <legend className="legend">Neglect Phrases</legend>
            <input
              className="input_field"
              {...register("badwords")}
              placeholder="Word"
              name="badwords"
            /></div>
          <div>
            <legend className="legend">Block list</legend>
            <input
              // style={{ marginBottom: "-10px" }}
              className="input_field"
              name="blocks"
              {...register("blocks")}
              placeholder="Word"
            />
          </div>
          <div>
            <legend className="legend">Comments end date</legend>
            <input
              className="input_field"
              {...register("endDate")}
              placeholder="25/02/2023"
              name="endDate"
            /></div>
      

        </div>

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
    </div>
  );
};

export default TiktokConditions;
const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ tooltip: className }} />
))(({ theme }) => ({
  backgroundColor: "red", // Set the background color here
  color: "white", // Set the text color here
  // Add any other custom styles you need
}));




