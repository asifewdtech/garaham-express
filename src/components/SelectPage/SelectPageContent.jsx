import { Box, Button, Typography, Container } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
const SelectPageContent = ({decrement, increment}) => {
  return (
    <>
      {/* <div style={{ display: "flex" }}> */}
        {/* <div style={{width: "70%"}}> */}
          <Typography className="CP_heading">
            {" "}
            Select your Facebook page
          </Typography>
          <Typography className="CP_sub_heading">
            Choose your Facebook page
          </Typography>
          <div className="custom-select">
            <select className="select_page">
              <option>Test Page</option>
              <option>Test 1</option>
              <option>Test 2</option>
              <option>Test 3</option>
            </select>
          </div>
          <Link href="#">
            <Button variant="contained" className="save_btn" onClick={increment}>
              Save and Continue
            </Button>
          </Link>
        {/* </div> */}
      {/* <div className="side_container">
        <div className="image_container">
          <Image width="115" height="115" alt="fblogo" src="/fbround.png" />
        </div>
        <div className="side_text">
          <Typography className="contest">Facebook Contest</Typography>
          <div className="page">
            <Typography sx={{ pb: "10px", fontFamily: "Rubik" }}>
              Page
            </Typography>
            <Typography className="fb-box-condition">Test Page</Typography>
          </div>
        </div>
      </div> */}
      {/* </div> */}
    </>
  );
};

export default SelectPageContent;
