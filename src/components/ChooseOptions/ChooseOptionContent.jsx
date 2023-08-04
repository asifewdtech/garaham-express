import React, { useState } from "react";
import { Typography, Card, Box, Container, CardContent, CardMedia, Button  } from "@mui/material";
import MySwitch from "../ConditionsForm/Switch";
import { useRouter } from "next/router";
import CustomNumberInput from "../CustomNumberInput";
import Image from "next/image";
import Link from "next/link";

const ChooseOptionContent = () => {

  const [showAdvanceOptions, setshowAdvanceOptions] = useState(false);
  const [showProCustomize, setshowProCustomize] = useState(false);
  // console.log(showAdvanceOptions)

  const router = useRouter();

  const label = { inputProps: { "aria-label": "Color switch demo" } };
  const [BasicConditions, setBasicConditions] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    radioInput: "option1",
  });
  const [advancedConditions, setadvancedConditions] = useState({
    words: "",
    phrases: "",
    minimumTags: "",
    mention: "",
    blockList: "option1",
  });
  const [proOptions, setproOptions] = useState({
    logo: "",
    date: "",
    bgColor: "",
    style: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBasicConditions((prevBasicConditions) => ({
      ...prevBasicConditions,
      [name]: value,
    }));
  };
  const handleAdvanceChange = (e) => {
    const { name, value } = e.target;
    setadvancedConditions((prevBasicConditions) => ({
      ...prevBasicConditions,
      [name]: value,
    }));
  };
  const handleProcustomizaion = (e) => {
    const { name, value } = e.target;
    setproOptions((prevBasicConditions) => ({
      ...prevBasicConditions,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(BasicConditions);
  };

  return <>
    <Typography className="CP_heading">
      {" "}
      Select the conditions you want to apply on your giveaway
    </Typography>
    <Typography className="CP_sub_heading">
      Basic Conditions
    </Typography>
    {/* FORM */}
    <form onSubmit={handleSubmit} className="form">
      <div className="text_inputs">
        <div>
          <legend className="legend">Giveaway Title</legend>
          <input
            className="input_field"
            name="input1"
            label="Input 1"
            value={BasicConditions.input1}
            onChange={handleChange}
            placeholder="New Year Giveaway"
          />
        </div>
        <div>
          <legend className="legend">Number of winners</legend>
          
          <CustomNumberInput value = {BasicConditions.winners}
                onChange={handleChange}/>
        </div>
        <div>
          <legend className="legend">Censor Words</legend>
          <input
            className="input_field"
            name="input3"
            label="Input 3"
            value={BasicConditions.input3}
            onChange={handleChange}
            placeholder="Word"
          />
        </div>
        <div>
          <legend className="legend">Filter by hashtag #</legend>
          <input
            className="input_field"
            name="input4"
            label="Input 4"
            value={BasicConditions.input4}
            onChange={handleChange}
            placeholder="#peace"
          />
        </div>
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
            <div>
              <legend className="legend">Search for words</legend>
              <input
                className="input_field"
                name="words"
                value={advancedConditions.words}
                onChange={handleAdvanceChange}
                placeholder="words"
              />
            </div>
            <div>
              <legend className="legend">Required phrases</legend>
              <input
                className="input_field"
                name="phrases"
                value={advancedConditions.phrases}
                onChange={handleAdvanceChange}
                placeholder="phrases"
              />
            </div>
            <div>
              <legend className="legend">Minimum Tags</legend>
              <input
                className="input_field"
                name="minimumTags"
                value={advancedConditions.minimumTags}
                onChange={handleAdvanceChange}
                placeholder="Minimum Tags"
              />
            </div>
            <div>
              <legend className="legend">Filter by mention</legend>
              <input
                className="input_field"
                name="mention"
                value={advancedConditions.mention}
                onChange={handleAdvanceChange}
                placeholder="mention"
              />
            </div>
            <div>
              <legend className="legend">Block list</legend>
              <input
                className="input_field"
                name="blockList"
                value={advancedConditions.blockList}
                onChange={handleAdvanceChange}
                placeholder="Separated with commas"
              />
            </div>
            <div>
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
              <div className="exclude switch">
                <MySwitch
                  // checked={checked}
                  // onChange={handleChange}
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
                  Exclude Duplicates
                </Typography>
              </div>
            </div>
          </>
        )}
        <div></div>
        <div className="switch">
          <div className="switch_container advanced ">
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
        {showProCustomize && (
          <>
            <div>
              <legend className="legend">Logo</legend>
              <div className="logo_file_container">
                <input
                  id="logo"
                  className="input_field"
                  name="logo"
                  type="file"
                  value={proOptions.logo}
                  onChange={handleProcustomizaion}
                  placeholder="logo"
                />
                <label for='logo' className="file_logo">Choose file</label>
                <span>No file choosen</span>
              </div>
            </div>
            <div>
              <legend className="legend">Filter by mention</legend>
              <input
                className="input_field"
                type="datetime-local"
                name="phrases"
                value={advancedConditions.phrases}
                onChange={handleAdvanceChange}
                placeholder="phrases"
              />
            </div>
            <div>
              <legend className="legend">BgColor</legend>
              <select
                className="input_field min_screen"
                name="minimumTags"
                value={proOptions.bgColor}
                onChange={handleProcustomizaion}
              >
                <option value="">1</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div>
              <legend className="legend">Confetti style</legend>
              <select
                className="input_field min_screen"
                name="minimumTags"
                value={proOptions.bgColor}
                onChange={handleProcustomizaion}
              >
                <option value="">1</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </>
        )}
      </div>
      <Container maxWidth='xl' sx={{marginLeft: "-12px"}}>
        <Box className="post_buttons" sx={{ display: { xs: 'flex', justifyContent: 'space-around' } }}>
          <Link href='#'>
            <Button variant="contained" className="go_back">Go Back</Button>
          </Link>
          <Link href='#'>
            <Button variant="contained" className="save_btn">Save and Continue</Button>
          </Link>
        </Box>
      </Container>
    </form>
  </>
}

export default ChooseOptionContent;