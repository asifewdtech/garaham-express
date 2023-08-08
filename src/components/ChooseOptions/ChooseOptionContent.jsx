import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Typography,
  Card,
  Box,
  Container,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import MySwitch from "../ConditionsForm/Switch";
import { useRouter } from "next/router";
import CustomNumberInput from "../CustomNumberInput";

const ChooseOptionContent = ({ decrement, increment, setContestData }) => {
  const [showAdvanceOptions, setshowAdvanceOptions] = useState(false);
  const [showProCustomize, setshowProCustomize] = useState(false);
  const [winners, setWinnersValue] = useState(0);
  const [posts, setPosts] = useState(0);
  const [followers, setFollowers] = useState(0);
  // const [winners, setWinnersValue] = useState(0);



  const label = { inputProps: { "aria-label": "Color switch demo" } };

  // using reactHookForm
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const winnersValue = watch('winners');

  const onSubmit = (data, e) => {
    console.log("Form Data:", data);
    console.log("on submit chala");
    const dataToSend = { ...data, winners: winnersValue };
    setContestData(prev => ({ ...prev, conditions:  dataToSend }));
    console.log(winnersValue); // This might not have the updated value
  
    // Instead, use data from state
    console.log(data.winners); // Make sure the field name matches the "winners" field in your form
    increment(e)
  };
  

  return (
    <>
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
              placeholder="New Year Giveaway"
            />
          </div>
          <div>
            <legend className="legend">Number of winners</legend>

            <CustomNumberInput
             onChange={setWinnersValue}
              className="input_field"
              value={winnersValue}
              {...register("winners")}
              placeholder="Number of winners"
            />
          </div>
          <div>
            <legend className="legend">Censor Words</legend>
            <input
              className="input_field"
              {...register("words")}
              placeholder="Censor words"
            />
          </div>
          <div>
            <legend className="legend">Filter by hashtag #</legend>
            <input
              className="input_field"
              {...register("hashtag")}
              placeholder="@peace"
            />
          </div>
          <div className="exclude switch">
            <MySwitch
              // checked={checked}
              // onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <Typography className="switch_text">Exclude Duplicates</Typography>
          </div>
        </div>

        <div className="text_inputs">
          <div className="switch">
            <div className="switch_container advanced switch">
              <MySwitch
                {...label}
                onChange={() => setshowAdvanceOptions(!showAdvanceOptions)}
              />
              <Typography className="switch_text">
                Show Advanced Conditions
              </Typography>
            </div>
          </div>
          {showAdvanceOptions && (
            <>
            <div></div>
              <div style={{ paddingBottom: "10px" }} className="exclude switch">
                <MySwitch
                  // checked={checked}
                  // onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <Typography className="switch_text">
                  Must have following accounts
                </Typography>
              </div>
              <div>
                <legend className="legend">Minimum Posts</legend>

                <CustomNumberInput
                    onChange={setPosts}
                    className="input_field"
                    value={posts}
                    {...register("posts")}
                    placeholder="1"
                />
              </div>
              <div>
                <legend className="legend">Search for words</legend>
                <input
                 className="input_field"
                 {...register("words")}
                 placeholder="words"
                />
              </div>
              <div>
                <legend className="legend">Minimum Followers</legend>

                <CustomNumberInput
                onChange={setFollowers}
                className="input_field"
                value={followers}
                {...register("followers")}
                placeholder="0"
                />
              </div>
              <div>
                <legend className="legend">Required phrases</legend>
                <input
                   className="input_field"
                   {...register("phrases")}
                   placeholder="phrases"
                />
              </div>
              <div>
                <legend className="legend">Minimum Tags</legend>
                <input
                   className="input_field"
                   {...register("minimum_tags")}
                   placeholder="minimum tags"
                />
              </div>
              <div>
                <legend className="legend">Filter by mention</legend>
                <input
                   className="input_field"
                   {...register("mentions")}
                   placeholder="@mention"
                />
              </div>
              <div>
                <legend className="legend">Block list</legend>
                <textarea
                 className="input_field"
                 {...register("block_list")}
                 placeholder="Block lists"
                ></textarea>
              </div>
              <div>
                <div className="exclude switch">
                  <MySwitch
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <Typography className="switch_text">
                    Avoid duplicate tags
                  </Typography>
                </div>
                <div className="exclude switch">
                  <MySwitch
                    // checked={checked}
                    // onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <Typography className="switch_text">
                    Get Unique users
                  </Typography>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="switch" style={{ paddingBottom: "20px" }}>
          <div className="switch_container advanced" style={{ width: "43%" }}>
            <MySwitch
              {...label}
              // checked={/* Your checked value from form data */}
              onChange={() => setshowProCustomize(!showProCustomize)}
            />
            <Typography className="switch_text pro">
              Pro Version Customization - Branding
            </Typography>
          </div>
        </div>
        <div className="text_inputs">
        {showProCustomize && (
            <>
              <div>
                <legend className="legend">Logo</legend>
                <div className="logo_file_container">
                  <input
                   name="logo"
                   type="file"
                  className="input_field"
                  {...register("logo")}
                  placeholder="logo"
                  />
                  <label for="logo" className="file_logo">
                    Choose file
                  </label>
                  <span>No file choosen</span>
                </div>
              </div>
              <div>
                <legend className="legend">Background Color</legend>
                <select
                  className="input_field min_screen"
                  {...register("background_color")}
                  placeholder="Bg color"
                >
                  <option value="Magenta">Magenta</option>
                  <option value="Test">Test</option>
                </select>
              </div>
              <div>
                <legend className="legend">Confetti style</legend>
                <select
                  className="input_field min_screen"
                  {...register("style")}
                  placeholder="1"
                >
                  <option value="Rainbow">Rainbow</option>
                  <option value="Test">Test</option>
                </select>
              </div>
              <div>
                <legend className="legend">Set a timer (Countdown)</legend>
                <input
                  className="input_field"
                  // type="datetime-local"
                  type="time"
                  {...register("timer")}
                  placeholder=""
                />
              </div>
            </>
          )}
          
          {/* show pro options here */}</div>
        <Container maxWidth="xl" sx={{ marginLeft: "-12px" }}>
          <Box
            className="post_buttons"
            sx={{ display: { xs: "flex", justifyContent: "space-around" } }}
          >
            {/* <Link href="#"> */}
              <Button
                variant="contained"
                className="go_back"
                onClick={decrement}
              >
                Go Back
              </Button>
            {/* </Link> */}
            {/* <Link href="#"> */}
              <Button type="submit" variant="contained" className="save_btn">
                Save and Continue
              </Button>
            {/* </Link> */}
          </Box>
        </Container>
      </form>
    </>
  );
};

export default ChooseOptionContent;
