import { Box, Button, Typography, Container } from "@mui/material";
import React from "react";
import Image from "next/image";
import Navbar from "@/components/AppBar/AppBar";
import Header from "@/components/Header/Header";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import SelectButton from "@/components/SelectButton/SelectButton";

const SelectFbPage = () => {
  const [selectTab, setselectedTab] = useState("select-page");
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
  return <>
    <Navbar />
    <Header />
    <Container maxWidth='xl'>
      <Box className="SP_container">
        {/* <div>
          <ul style={{paddingLeft: 0}}>
            <li onClick={handleSelect} data-tab="select-page" className={`list_items ${selectTab === "select-page" ? "active_li" : null}`}>
              1. Select a page
            </li>
            <li onClick={handleSelect} className={`list_items ${selectTab === "select-post" ? "active_li" : null}`} data-tab="select-post">2. Select a post</li>
            <li onClick={handleSelect} className={`list_items ${selectTab === "choose-options" ? "active_li" : null}`} data-tab="choose-options">3. Choose options</li>
            <li onClick={handleSelect} className={`list_items ${selectTab === "pick-winner" ? "active_li" : null}`} data-tab="pick-winner">4. Pick a winner</li>
          </ul>
        </div> */}
        <SelectButton/>
        
        <div className="SP_inner_container">
          <Typography className="SP_heading">
            {" "}
            Select your Facebook page
          </Typography>
          <Typography className="choose_text">
            Choose your Facebook page
          </Typography>

          <div className="custom-select">
            <select className="select_page">
              <option>Test Page</option>
            </select>
          </div>
          <Link href='/SelectPost/SelectPost'>
            <Button variant="contained" className="save_btn">Save and Continue</Button>
          </Link>
          {/* <Button varient="contained" className="save_btn"> Save and Continue</Button> */}
        </div>
      </Box>
    </Container>
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
      </div>
    </div>
  </>
};

export default SelectFbPage;
