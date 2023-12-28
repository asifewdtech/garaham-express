import { useState, useEffect } from "react";
import { Button, MenuItem, Typography } from "@mui/material";
import Link from "next/link";
import axios from "axios";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axiosInstance from "../utils/Utils";
const SelectPageContent = ({
  increment,
  setContestData,
  pages,
  setPosts,
  contestData,
}) => {
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [pageName, setpageName] = useState(null)
  useEffect(() => {
    const content = localStorage.getItem('selectedValue')
    if (content) {
      setpageName(JSON.parse(content))
    }
  }, []);


  const handlePageChange = async (e) => {
    const selectedValue = e.target.value;
    const [id, page] = selectedValue.split("-");
    setpageName(selectedValue)
    localStorage.setItem("selectedValue", JSON.stringify(selectedValue));
    localStorage.setItem("selectedPage", JSON.stringify(id));
    localStorage.setItem("pagecontent", JSON.stringify(page));
    localStorage.removeItem("selectedConditions");
    localStorage.removeItem("selectedPost");
    setContestData((prev) => ({
      ...prev,
      page: page,
      postText: "",
      img: "",
      conditions: {},
    }));
  };
  return (
    <>
      <Typography className="CP_heading"> Select your Facebook page</Typography>
      <Typography className="CP_sub_heading ">
        Choose your Facebook page
      </Typography>
      <div className="custom-select">
        <Select
          size="5"
          id="demo-simple-select"
          className="select_page select_scrollbar"
          name="page"
          onChange={(e) => handlePageChange(e)}
          value={pageName || ''}
          displayEmpty
          MenuProps={{
            classes: { paper: "options-container  select_scrollbar" },
          }}
        >
          <CustomMenuItem value="" id='placeholder_option' >Select your facebook page</CustomMenuItem>
          {pages.map((page) => (
            <CustomMenuItem
              key={page.id}
              selected={selectedPageId === page.id}
              value={`${page.id}-${page.page}`}
            >
              {page.page}
            </CustomMenuItem>
          ))}
        </Select>
      </div>
      <Link href="#">
        <Button
          sx={{ marginTop: '42px' }}
          disableTouchRipple
          disabled={!contestData.page}
          variant="contained"
          className="save_btn"
          onClick={increment}
        >
          Save and Continue
        </Button>
      </Link>
    </>
  );
};

export default SelectPageContent;

const CustomMenuItem = ({ children, ...props }) => (
  <MenuItem
    sx={{
      color: 'var(--black-700-base, #3F3B3B)',
      fontFeatureSettings: 'clig off, liga off',
      fontFamily: 'Roboto',
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '28px',
      padding: '10px 18px',
    }}
    {...props}
  >
    {children}
  </MenuItem>
);